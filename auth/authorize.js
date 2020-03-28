const getToken = require('./gettoken')

function makeAuthorize (redisClient, logger) {
  return function authorize () {
    return (req, res, next) => {
      const token = getToken(req.headers)

      if (token) {
        redisClient.get(token, (err, reply) => {
          if (err) {
            logger.error('Error authorizing')
            logger.error(err)
            return res.sendStatus(401)
          }

          if (!reply) {
            return res.sendStatus(401)
          }

          req.user = JSON.parse(reply)
          return next()
        })
      } else {
        return next()
      }
    }
  }
}

module.exports = makeAuthorize
