const express = require('express');
const { createTask, getTasks, getUserTasks, assignTask } = require('../controllers/tasks');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/:id', createTask);
router.get("/", getTasks);
router.get("/:id", getUserTasks);

/* UPDATE */
router.patch("/:id", assignTask);

module.exports = router;
