const { fetchData, postData } = require('./src/github')
require('dotenv').config()
const mailer = require('./src/mailer')
const mdGenerator = require('./src/mdGenerator')
const htmlGenerator = require('./src/htmlGenerator')
const fs = require('fs')
const path = require('path')
const dayjs = require('./src/day')

const resolve = (fileName) => {
  return path.join(__dirname, './results', fileName)
}

const writer = (filePath, data) => {
  return fs.writeFileSync(filePath, data, {
    encoding: 'utf-8'
  })
}

const main = async () => {
  console.log('Fetching data...')
  console.log('Current User:', process.env.GH_USER.length)
  const data = await fetchData()
  console.log('Fetching data done, handle data...')
  const mdText = mdGenerator(data.data)
  const htmlText = await htmlGenerator(mdText)
  const today = dayjs.format('YYYY-MM-DD')
  const dataPath = resolve(`${today}.json`)
  const mdPath = resolve(`${today}.md`)
  const htmlPath = resolve('index.html')
  console.log('Handle data done, write file...')
  writer(dataPath, JSON.stringify(data))
  writer(mdPath, mdText)
  writer(htmlPath, htmlText)
  console.log('Write file done, send email...')
  await mailer({
    html: htmlText,
    attachments: [
      {
        path: dataPath
      }
    ]
  })
  console.log('Send email done!')
  console.log('Check if data_repo', process.env.DATA_REPO)
  if (process.env.DATA_REPO) {
    await postData(`${today}.json`, JSON.stringify(data), process.env.DATA_REPO)
  }
  console.log('All done!')
  process.exit(0)
}

main()
