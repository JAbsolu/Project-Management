const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    userId: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    title : String,
    description:{
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    assignedTo : {
        type: String,
    },
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;