const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId : String,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    increasePriority: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;