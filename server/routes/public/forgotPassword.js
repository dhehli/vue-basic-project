
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const gqlconnect = require('../../helpers/gqlConnect');
const asyncMiddleware = require('../../helpers/asyncMiddleware');

const lookupTakenMail = async (email) => {
  console.log("email", email)
  emailLookupQuery = {
    query: `query($email: String!){
      getAddress(input: {email: $email}){
        totalCount
      }
    }`,
    variables: { email }
  }

  console.log("email LookupQuery", emailLookupQuery)

  const emailRes = await gqlconnect('/netlive', emailLookupQuery);
  console.log("emailRes",emailRes)
  return !!emailRes.data.getAddress.totalCount;
}

router.post('/api/forgotpassword', [
  check('variables.email').isEmail(),
], asyncMiddleware(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const data = req.body;
  let { email } = data.variables;

  const isEmailTaken = await lookupTakenMail(email)

  if(!isEmailTaken){
    return res.status(422).json({ errors: [{msg: "Email not found"}] });
  }

  
  const storeForgotPassword = await gqlconnect('/netlive', data);
  return res.status(200).json(storeAddressRes);
}))

module.exports = router;