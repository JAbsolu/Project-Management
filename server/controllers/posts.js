 const Post = require('../models/Post');
 const User = require('../models/User');

// CREATE POST
const createPost = async (req, res) => {
    try {
        const { userId, firstName, lastName, title, text } = req.body;
        const user = await User.findById(userId);
        
        const newPost = new Post({
            userId,
            user,
            firstName,
            lastName,
            title,
            text,
        });

        await newPost.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        res.status(409).json({ msg: error.message });
    }
};


//GET ALL POSTS
const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ msg: error.msg });
    };
};

// UPDATE POST
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isPriority = post.increasePriority.get(userId);

        if (isPriority) {
            post.increasePriority.delete(userId);
        } else {
            post.increasePriority.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                increasePriority: post.increasePriority,
                comments: post.comments,
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};


module.exports = { createPost, getPost, updatePost };