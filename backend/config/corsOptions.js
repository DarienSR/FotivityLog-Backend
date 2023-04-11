const allowedOrigins = require('./allowedOrigins')
const corsOptions = {
  origin: (origin, callback) => {
    // !origin allows stuff like insomnia and postman
    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by cors'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions;