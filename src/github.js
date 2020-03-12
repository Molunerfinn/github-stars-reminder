require('dotenv').config()
const axios = require('./axios')
const topNumber = require('./getTopNumber')
const dayjs = require('./day')
const gql = `
{
  user(login: "${process.env.GH_USER}") {
    repositories(affiliations: [OWNER], orderBy: {direction: DESC, field: STARGAZERS}, first: ${topNumber}) {
      edges {
        node {
          name
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}`

/**
 * fetch user repo stars
 */
const fetchData = async () => {
  const res = (await axios.post('/graphql', {
    query: gql
  })).data.data
  const data = res.user.repositories.edges.map(item => {
    return {
      name: item.node.name,
      stars: item.node.stargazers.totalCount
    }
  })
  return {
    data
  }
}

/**
 *
 * @param {string} fileName
 * @param {string} data
 * @param {string} repoName
 */
const postData = async (fileName, data, repoName) => {
  const year = dayjs.year()
  let existsFileResult = {}
  try {
    existsFileResult = (await axios.get(`/repos/${repoName}/contents/${year}/${fileName}`)).data
  } catch (e) {
    if (e.response.status === 404) {
      console.log('Non exists')
    }
  }
  let sha
  if (existsFileResult.sha) {
    sha = existsFileResult.sha
  }
  const postOption = {
    method: 'PUT',
    url: `/repos/${repoName}/contents/${year}/${fileName}`,
    data: {
      message: 'Upload by github-stars-reminder',
      branch: 'master',
      sha,
      content: Buffer.from(data).toString('base64'),
      path: year + '/' + fileName
    },
    json: true
  }
  try {
    await axios(postOption)
  } catch (e) {
    if (e.response.data.message.includes('sha')) {
      return true // already upload
    } else {
      console.log(e.reponse.data.message)
    }
  }
}

module.exports = {
  fetchData,
  postData
}
