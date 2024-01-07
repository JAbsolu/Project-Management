const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
    },
    picturePath:{
        type: String,
        default: '',
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    numberOftasks: {
        type: Number,
        default: 0,
    },
    tasks: {
        type: Array,
        default: [],
    },
    team: {
        type: Array,
        default: [],
    },
    teammates: {
        type: Array,
        default: [],
    }
});

//saving the user schema as user
const User = mongoose.model('User', userSchema);
module.exports = User;