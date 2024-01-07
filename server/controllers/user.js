const User = require('../models/User');
const Task = require('../models/Task');

//GET USER
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ msg: error.msg });
    }
}

//GET USER TASKS
const getUserTask = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const tasks = await Promise.all(
            user.tasks.map((id) => User.findById(id))
        );

        const formattedTasks = tasks.map(({ _id, title, description, comments, isCompleted, assignedTo }) => {
            return { _id, title, description, comments, isCompleted, assignedTo };
        });
        res.status(200).json(formattedTasks);
    } catch (error) {
        res.status(404).json({ msg: error.msg });
    }
};

//GET USER TEAM & TEAMATES
const getUserTeammates = async (req, res) => {
    try {
        const { id } = req.params; // Corrected "param" to "params"
        const user = await User.findById(id);

        const teammates = await Promise.all(
            user.teammates.map((id) => User.findById(id))
        );

        const team = await Promise.all(
            user.team.map((id) => User.findById(id))
        );

        const formattedTeammates = teammates.map(({ _id, firstName, lastName, title, email, picturePath, numberOftasks, tasks }) => {
            return { _id, firstName, lastName, title, email, picturePath, numberOftasks, tasks }; // Corrected "numberOfTasks" to "numberOftasks"
        });

        res.status(200).json(formattedTeammates);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

module.exports = { getUser, getUserTask, getUserTeammates };