function corsOrigin () {
  const whitelist = {
    production: [
      'https://felagatal.fri.is'
    ],
    development: [
      'http://local.fri.is:1234',
      'http://local.fri.is:3010'
    ]
  }

  return function (origin, cb) {
    if (whitelist[process.env.NODE_ENV].indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed'))
    }
  }
}

module.exports = corsOrigin
