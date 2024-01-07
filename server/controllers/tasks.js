const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (req, res) => {
    try {
        const { 
            userId,
            firstName,
            lastName,
            title,
            description, 
        } = req.body;
        const user = await User.findById(userId);

        const newTask = new Task({
            userId,
            firstName,
            lastName,
            title,
            description,
        });

        const task = await newTask.save();
        const userTasks = user.tasks;
        if (task._id === user._id ) {
            userTasks.push(task)
        }
        const tasks = await Task.find();
        res.status(201).json(tasks);
    } catch (error) {
        res.status(409).json({ msg: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = User.findById({ userId });
        const task = await Task.find({ userId });
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const assignTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const user = await User.findById(userId);
        const task = await Task.findById(id);
        const isAssigned = task.assignedTo.includes(userId);

        if (!isAssigned) {
            task.assignedTo.push(userId); // Push userId, not the user object
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { assignedTo: task.assignedTo }
        );

        res.status(200).json({ updatedTask });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};


module.exports = { createTask, getTasks, getUserTasks, assignTask };
