'use strict'

const validateCard = (body) => {
  try {
    const ccNumber = body.card_number.replace(/\s/g, '')
    let isnum = /^\d+$/.test(ccNumber);
    let json = {}
    json['card_number'] = ccNumber
    if (isnum) {
      json.valid_input = true
      return validateByLuhn(json)
    } else {
      json.valid_input = false
      return json
    }
  } catch (error) {
    console.log(`Error in fetching user details: %s , %j`, error, error)
    throw error
  }
}


const validateByLuhn = (json) => {

  let card = json.card_number
  let totalSum = 0
  let even = true;
  let checkNum = parseInt(card.charAt(card.length - 1), 10)

  for (var i = card.length - 2; i >= 0; i--) {

    let curVal = parseInt(card.charAt(i), 10);

    if (even && (curVal *= 2) > 9) { // double the value of every second digit 
      curVal -= 9;                    // If value > 9 , then total of both digit.
    }

    totalSum += curVal;  // Adding current value to Total
    even = !even; 
  }

  if ((10 - (totalSum % 10)) == checkNum) {  // Check with Last digit of card number
    json.is_card_valid = true
    
  } else {
    json.is_card_valid = false
  }

  return json
}

module.exports = {
  validateCard
}