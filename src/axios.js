
require('dotenv').config()
const axios = require('axios').default

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'bearer ' + process.env.GH_TOKEN
    config.baseURL = 'https://api.github.com'
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

module.exports = axios
