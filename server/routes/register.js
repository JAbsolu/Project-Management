const express = require('express');
const authRoutes = require('../controllers/auth');

const router = express.Router();
router.post('/', authRoutes.register);

module.exports = router;