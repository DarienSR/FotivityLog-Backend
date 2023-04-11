const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute time frame
  max: 3, // attempts per ip per window per minute
  message:
  { message: "Too many login attempts, please wait 60 seconds to try again."},
  handler: (req, res, next, options) => {
    logEvents(`Too Many Requests: ${ options.message.message }\t${  req.method }\t${ req.url }\t{ req.headers.origin }`, 'errLog.log')
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // return rate limit info
  legacyHeaders: false
});

module.exports = loginLimiter;