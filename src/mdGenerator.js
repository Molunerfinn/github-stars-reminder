// @ts-check
require('dotenv').config()
const dayjs = require('./day')
const topNumber = require('./getTopNumber')
const ghUSER = process.env.GH_USER
/**
 * @typedef {Object} item
 * @property {string} name
 * @property {number} stars
 * @param {item[]} data
 */
const mdGenerator = (data) => {
  if (!Array.isArray(data)) {
    return 'Data is invalid.'
  }
  const total = data.reduce((pre, cur) => {
    return pre + cur.stars
  }, 0)
  const today = dayjs.format('YYYY-MM-DD')
  const title = h1Generator(`${today} ${ghUSER} Top ${topNumber} Stars List`)
  const totalText = `**Total stars: ${total}**, awesome! \n`
  const table = tableGenerator(data)
  return title + totalText + table
}

/**
 *
 * @param {string} text
 */
const h1Generator = (text) => {
  return `# ${text}\n`
}

/**
 *
 * @param {item[]} data
 */
const tableGenerator = (data) => {
  const tableHead = '| Name | Stars |'
  const tableSep = '| --- | --- |'
  let tableBody = ''

  data.forEach(item => {
    tableBody += `| [${item.name}](https://github.com/${process.env.GH_USER}/${item.name}) | ${item.stars} | \n`
  })

  return tableHead + '\n' + tableSep + '\n' + tableBody
}

module.exports = mdGenerator
