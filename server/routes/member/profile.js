const express = require('express');
const router = express.Router();

const gqlconnect = require('../../helpers/gqlConnect');
const asyncMiddleware = require('../../helpers/asyncMiddleware');

router.post('/api/profile', asyncMiddleware(async (req, res, next) => {
  console.log("req", req.user)
  const query = {
    query: `query($address_id: ID!){
      getAddress(input: {address_id: $address_id}){
        nodes{
          salutation_id
          firstname
          lastname
          email
        }
        totalCount
      }
    }`,
    variables: { address_id: req.user.address_id }
  }

  const response = await gqlconnect('/netliveprivate', query);

  return res.status(200).json(response);
}))


module.exports = router;