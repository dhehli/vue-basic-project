const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


const gqlconnect = require('../../helpers/gqlConnect');
const asyncMiddleware = require('../../helpers/asyncMiddleware');

router.post('/api/profile', asyncMiddleware(async (req, res, next) => {
  let responseData;
  const data = req.body;
  const { address_id } = req.user;
  
  data.variables.address_id = address_id

  const response = await gqlconnect('/netliveprivate', data);

  if(response.data.getAddress){
    responseData = {
      ...response.data.getAddress.nodes[0]
    }
  }
  if(response.data.updateAddress){
    responseData = {
      ...response.data.updateAddress
    }
  }

  return res.status(200).json(responseData);
}))

router.post('/api/changepassword', [
  check('variables.password').trim().isLength({ min: 3 }).withMessage('Password must be at least 3 digits'),
  check('variables.password').custom((value, {req}) => {
    if (value !== req.body.variables.matchpassword) {
      return false
    } else {
      return value
    }
  }).withMessage("Passwords don't match.")
], asyncMiddleware(async (req, res, next) => {
  const errors = validationResult(req);
  const data = req.body;
  const { address_id } = req.user;
  const { password } = data.variables

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const cryptedPassword = bcrypt.hashSync(password, 4)
  data.variables.address_id = address_id
  data.variables.password = cryptedPassword;

  const response = await gqlconnect('/netliveprivate', data);
  return res.status(200).json(response);
}))



module.exports = router;