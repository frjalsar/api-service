const express = require('express')
const makeGetIssue = require('../lib/jira/getIssue')

function makeJiraRoute (config) {
  const router = express.Router()
  const getIssue = makeGetIssue(config)

  router.get('/:issue', (req, res, next) => {
    return getIssue(req.params.issue)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeJiraRoute
