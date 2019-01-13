const router = require('express').Router()
const pool = require('../db')
const createGetAllClubs = require('./getAll')

router.get('/', (_, res) => {
  const getAll = createGetAllClubs(pool)
  return getAll().then(list => {
    res.json(list)
  })
})

module.exports = router
