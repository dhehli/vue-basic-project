
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const gqlconnect = require('../../helpers/gqlConnect');
const asyncMiddleware = require('../../helpers/asyncMiddleware')
const passport = require('../../helpers/passport')

const lookupTakenMail = async (email) => {
  emailLookupQuery = {
    query: `query($email: String!){
      getAddress(input: {email: $email}){
        totalCount
      }
    }`,
    variables: { email }
  }
  const emailRes = await gqlconnect('/netlive', emailLookupQuery);
  return !!emailRes.data.getAddress.totalCount;
}

router.post('/api/register', [
  check('variables.email').trim().isEmail(),
  check('variables.password').trim().isLength({ min: 3 }).withMessage('Password must be at least 3 digits')
], asyncMiddleware(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const data = req.body;
  let { email, password } = data.variables;

  const isEmailTaken = await lookupTakenMail(email)

  if(isEmailTaken){
    return res.status(422).json({ errors: [{msg: "Email is already taken"}] });
  }

  const cryptedPassword = bcrypt.hashSync(password, 4)
  data.variables.password = cryptedPassword;

  const storeAddressRes = await gqlconnect('/netlive', data);
  return res.status(200).json(storeAddressRes);
}))

router.post('/api/login', passport.authenticate('local-login', {}), (req, res) => {
  console.log("done post")
})


module.exports = router;