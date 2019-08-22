const express = require('express');
const router = express.Router();

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


module.exports = router;