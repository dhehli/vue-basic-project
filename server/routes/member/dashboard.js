
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/api/dashboard', (req, res, next) => {
  return res.status(400).json({ message: "hallo" });
})


module.exports = router;