
const express = require('express');
const router = express.Router();

const gqlconnect = require('../../helpers/gqlConnect');
const asyncMiddleware = require('../../helpers/asyncMiddleware');

router.get('/api/dashboard', asyncMiddleware(async (req, res, next) => {
  if(req.isAuthenticated()){
    return res.status(200).json({ message: "auth ok" });
  }
  return res.status(400).json({ message: "not authenticated" });
}))


module.exports = router;