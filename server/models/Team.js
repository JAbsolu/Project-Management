const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    userId : String,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: String
    },
    members: {
        type: Array,
        default: [],
    },
    tasks: {
        type: Array,
        default: [],
    },
    activeTasks: {
        type: String,
        default: 0,
    },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;