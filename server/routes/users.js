const express = require('express');
const verifyToken = require('../middleware/auth');
const { getUserTeammates } = require('../controllers/user');
const { getUser } = require('../controllers/user');
const router = express.Router();

router.get('/', getUser); //Get All Users
router.get("/:id", getUser);//Get specific user


module.exports = router;