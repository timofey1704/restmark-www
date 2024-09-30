const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // максимальное количество запросов
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
})

const rateLimitExceededLogger = (req, res, next) => {
  if (req.rateLimit && req.rateLimit.remaining === 0) {
    console.log(`Rate limit exceeded for IP // login route: ${req.ip}`)
  }
  next()
}

module.exports = { loginLimiter, rateLimitExceededLogger }
