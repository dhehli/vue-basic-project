const express = require('express');
const router = express.Router();
const loginSignup = require('./loginSignup')

router.use(loginSignup)

module.exports = router;