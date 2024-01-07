const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
// Register the user
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            title,
            location,
            userName,
            email,
            password,
            picturePath,
        } = req.body;
        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await User.exists({ email: email });
        if (userExists) {
            return res.status(409).json({ msg: 'User already exists in the database.' });
        } else {
            const newUser = new User({
                firstName,
                lastName,
                title,
                location,
                userName,
                email,
                password: hashedPassword,
                picturePath,
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




//Logging in
const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        //find user if exist
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: 'User is not found'});
        //check if the password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'You have entered the wrong password' });

        // const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET); // not requiring the token for now
        delete user.password;
        // res.status(200).json({token, user});   // not requiring the token
        res.status(200).json({ user });  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };