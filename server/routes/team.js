const express = require("express");
const { createTeam, getTeams } = require('../controllers/team');
const router = express.Router();

router.get('/', getTeams); //Get all teams
router.post('/:id', createTeam); //create a team
router.get('/:id', getTeams); //get teams created by specific user

module.exports = router;
