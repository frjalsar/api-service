const express = require('express')
const makeCreateMeet = require('../lib/meets/create')

function makeMeetRoute (db) {
  const router = new express.Router()

  router.get('/', (req, res, next) => {
    res.send('Kiddi sökkar')
  })

  router.post('/', (req, res, next) => {
    const createAthlete = makeCreateMeet(db)

    return createAthlete(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeMeetRoute
