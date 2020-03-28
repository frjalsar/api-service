const agent = require('superagent')

function makeGetIssue (config) {
  return function getIssue (id) {
    return agent
      .get(config.url + '/issue/' + id)
      .set('Authorization', 'Basic ' + config.auth)
      .then(res => {
        return res.body
      })
  }
}

module.exports = makeGetIssue
