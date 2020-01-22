require('dotenv').config()
let topNumber = 20 // default is 20
if (process.env.TOP_NUMBER) {
  topNumber = process.env.TOP_NUMBER > 100
    ? 100 : process.env.TOP_NUMBER <= 0
      ? 20 : process.env.TOP_NUMBER
}

module.exports = topNumber
