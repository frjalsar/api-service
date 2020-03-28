const parseCookie = require('cookie').parse

function getToken (headers) {
  let token
  if (headers.cookie) {
    token = parseCookie(headers.cookie).FRI_API_TOKEN
  }

  if (headers.authorization) {
    const parts = headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }

  return token
}

module.exports = getToken
