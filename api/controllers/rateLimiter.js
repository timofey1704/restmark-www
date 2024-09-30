const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимальное количество запросов
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
})

//пишем лог превышающих лимит
const rateLimitExceededLogger = (req, res, next) => {
  if (req.rateLimit && req.rateLimit.remaining === 0) {
    console.log(`Rate limit exceeded for IP: ${req.ip}`)
  }
  next()
}

// Экспортируем только лимитер как middleware
module.exports = { limiter, rateLimitExceededLogger }
