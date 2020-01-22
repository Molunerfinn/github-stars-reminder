require('dotenv').config()
const axios = require('./axios')
const topNumber = require('./getTopNumber')
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
  return data
}

module.exports = fetchData
