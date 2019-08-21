const express = require('express');
const router = express.Router();
const dashboard = require('./dashboard')
const profile = require('./profile')

router.use(dashboard)
router.use(profile)

module.exports = router;