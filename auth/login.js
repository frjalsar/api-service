const { compare } = require('bcryptjs')
const uid = require('uid-safe')
const makeSelectUsers = require('../lib/users/select')
const mapUsers = require('../lib/users/map')

function makeLogin (pgPool, redisClient) {
  return function login (username, password) {
    const selectUsers = makeSelectUsers(pgPool)

    return selectUsers({ username })
      .then(mapUsers)
      .then(users => {
        const user = users.length === 1 ? users[0] : undefined

        if (!user) {
          return undefined
        }

        return compare(password, user.password).then(success => {
          if (!success) {
            return undefined
          } else {
            return uid(18).then(token => {
              user.password = undefined
              redisClient.set(token, JSON.stringify(user))
              return { info: user, token }
            })
          }
        })
      })
  }
}

module.exports = makeLogin
