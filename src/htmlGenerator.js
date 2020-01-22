const md = require('markdown-it')()
const axios = require('axios')

const htmlGenerator = async (text) => {
  const css = (await axios.get('https://cdn.jsdelivr.net/npm/github-markdown-css@latest/github-markdown.min.css')).data
  const html =
  `
  <html>
  <head>
    <style>
      ${css}
    </style>
  </head>
  <body>
    <div class="markdown-body">
      ${md.render(text)} 
    </div>
  </body>
  </html>
  `
  return html
}

module.exports = htmlGenerator
