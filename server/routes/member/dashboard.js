
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/api/dashboard', (req, res, next) => {
  console.log("req.isAuthenticated()", req.isAuthenticated())
  return res.status(400).json({ message: "hallo" });
})


module.exports = router;