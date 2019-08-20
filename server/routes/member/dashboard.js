
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/api/dashboard', (req, res, next) => {
  if(req.isAuthenticated()){
    return res.status(200).json({ message: "auth ok" });
  }
  return res.status(400).json({ message: "not authenticated" });
})


module.exports = router;