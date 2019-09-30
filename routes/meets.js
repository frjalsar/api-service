const express = require('express')
function makeMeetRoute (db) {
  const router = new express.Router()

  router.get('/', (req, res, next) => {
    res.send('Kiddi sökkar')
  })

  return router
}

module.exports = makeMeetRoute
