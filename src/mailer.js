const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
require('dotenv').config()
const topNumber = require('./getTopNumber')
const ghUSER = process.env.GH_USER

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  pool: true,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const main = async ({
  text = undefined,
  html = undefined,
  attachments = undefined
}) => {
  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `${dayjs(new Date()).format('YYYY-MM-DD')} ${ghUSER} Top ${topNumber} Stars Count`,
    html,
    text,
    attachments
  })
}

module.exports = main
