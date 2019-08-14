
const express = require('express');
const gqlconnect = require('../../helpers/gqlConnect');
const passport = require('passport')
const router = express.Router();
require('../../helpers/passport');

router.post('/api/register', passport.authenticate('local-signup', {
}), (req, res) => {
  const data = req.body;
  
  gqlconnect('/netlive', data).then((response) => {
    res.status(200).json(response)
  }).catch(err => {
    res.status(500).json(err)
  })  
})

module.exports = router;