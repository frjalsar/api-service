const cleanKennitala = require('kennitala-utility').clean
const express = require('express')
const makeLogin = require('../auth/login')
const makeLogout = require('../auth/logout')
const getToken = require('../auth/gettoken')

function makeLoginRoute (db, redisClient, logger) {
  const login = makeLogin(db, redisClient)
  const logout = makeLogout(redisClient, logger)
  const router = express.Router()
  const cookieOptions = {
    domain: '.fri.is',
    secure: process.env.NODE_Env === 'production',
    httpOnly: true,
    sameSite: true,
    path: '/'
  }

  router.get('/', (req, res, _) => {
    res.json(req.user)
  })

  router.post('/login', (req, res, next) => {
    const oldToken = getToken(req.headers)
    const username = cleanKennitala(req.body.username)
    const password = req.body.password

    return login(username, password)
      .then(user => {
        if (user && user.token) {
          logout(oldToken)

          res
            .cookie('FRI_API_TOKEN', user.token, Object.assign({ maxAge: 2147483647000 }, cookieOptions))
            .send(user.info)
        } else {
          res.status(401).send('Notendanafn eða lykilorð rangt')
        }
      })
      .catch(next)
  })

  router.post('/logout', (req, res, _) => {
    const token = getToken(req.headers)
    const success = logout(token)

    res
      .clearCookie('FRI_API_TOKEN', Object.assign({ maxAge: 0 }, cookieOptions))
      .send(success)
  })

  return router
}

module.exports = makeLoginRoute
