const dayjs = require('dayjs')
const utcPlugin = require('dayjs/plugin/utc')

dayjs.extend(utcPlugin)

// For UTC+8
module.exports = dayjs.utc().add(8, 'h')
