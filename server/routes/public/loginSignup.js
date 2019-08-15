
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const gqlconnect = require('../../helpers/gqlConnect');


router.post('/api/register', [
  check('variables.email').isEmail(),
  check('variables.password').isLength({ min: 3 }).withMessage('Password must be at least 3 digits')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const data = req.body;
  let { email, password } = data.variables;

  const emailLookupQuery = {
    query: `query($email: String!){
      getAddress(input: {email: $email}){
        nodes{
          address_id
        }
        totalCount
      }
    }`,
    variables: { email }
  }

  const emailRes = await gqlconnect('/netlive', emailLookupQuery);
  const isEmailTaken = !!emailRes.data.getAddress.totalCount;

  if(isEmailTaken){
    return res.status(422).json({ errors: [{msg: "Email is already taken"}] });
  }

  const cryptedPassword = bcrypt.hashSync(password, 4)
  data.variables.password = cryptedPassword;

  const storeAddressRes = await gqlconnect('/netlive', data);
  return res.status(200).json(storeAddressRes)
})

module.exports = router;