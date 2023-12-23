const express = require('express');
const router = express.Router();

//Authentication Routes
const { signup, signin, signout } = require('../controllers/auth');

module.exports = router;