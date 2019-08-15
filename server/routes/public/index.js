const express = require('express');
const router = express.Router();
const loginSignup = require('./loginSignup')
const forgotPassword = require('./forgotPassword')

router.use(loginSignup)
router.use(forgotPassword)

module.exports = router;