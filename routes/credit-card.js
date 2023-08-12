const express = require('express');
const app = express.Router();

const { validateCard } = require('../service/validate')

app.post('/validate', async (req, res) => {
  try {
    const isValidJson = validateCard(req.body)
    console.log('is card valid : %s ', isValidJson)
    if (isValidJson && isValidJson.valid_input) {
      res.status(200).json(isValidJson)
    } else {
      res.status(400).json('something wrong with card number')
    }
  } catch (error) {
    res.status(500).json(error)
    console.log('error while validating card details: %j , %s', error, error)
    throw error
  }
});



module.exports = app;
