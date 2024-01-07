const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database/database');
const path = require('path');
const multer = require('multer');
require("dotenv").config();
const user = require('./routes/users');
const { register } = require('./controllers/auth')
const registerRoute = require('./routes/register'); // Import the registration route
const loginRoute = require('./routes/login'); // Import the login route
const tasksRoute = require('./routes/tasks');
const postsRoute = require('./routes/posts');
const teamsRoute = require('./routes/team');
const { rmSync } = require('fs');

const app = express();
const PORT = process.env.PORT || 3100;

console.log(process.env.NODE_ENV)

// Middlewares
app.use(cors());
app.use(bodyParser.json()); 
database(); // Connect to the Database

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//Routes with files
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', upload.single('picture'), postsRoute);

// Register and Login Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/user', user);
app.use('/tasks', tasksRoute);
app.use('/posts', postsRoute);
app.use('/teams', teamsRoute);

// Route for serving the React app
app.get(/^\/(index\.html)?$|^\/static\/|^\/js\/|^\/css\/|^\/images\//, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', req.url));
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
