
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const cors = require('cors')
const makeAuthorize = require('../auth/authorize')
const corsOrigin = require('../auth/corsOrigin')

function createService (pgPool, redisClient) {
  const authorize = makeAuthorize(redisClient)

  // Routes
  const makeAthleteRoute = require('../routes/athletes')
  const makeClubRoute = require('../routes/clubs')
  const makeRegionRoute = require('../routes/regions')
  const makeMembershipRoute = require('../routes/membership')
  const makeMeetRoute = require('../routes/meets')
  // const makePassesRoute = require('../passes/route')
  const makeLoginRoute = require('../routes/login')
  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(enforceHttps({
      trustProtoHeader: true
    }))
    app.use(compression())
    app.use(helmet())
  }

  app.use(cors({
    origin: corsOrigin(),
    credentials: true
  }))

  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

  app.use('/login', makeLoginRoute(pgPool, redisClient))
  app.use(authorize())
  app.use('/athletes', makeAthleteRoute(pgPool))
  app.use('/clubs', makeClubRoute(pgPool))
  app.use('/regions', makeRegionRoute(pgPool))
  app.use('/membership', makeMembershipRoute(pgPool))
  app.use('/meets', makeMeetRoute(pgPool))
  // app.use('/passes', makePassesRoute(pgPool))

  return app
}

module.exports = createService
