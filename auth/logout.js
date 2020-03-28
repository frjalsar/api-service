function makeLogout (redisClient, logger) {
  return function logout (token) {
    if (token) {
      redisClient.del(token, (err) => {
        if (err) {
          logger.error('Error logging out')
          logger.error(err)
          return false
        }

        return true
      })
    }
    return true
  }
}

module.exports = makeLogout
