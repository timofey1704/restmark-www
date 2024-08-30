const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  // получаем токен из Authorization
  const token = req.headers['authorization']

  if (token) {
    // проверяем токен
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // если токен недействителен, отправляем ответ 401
        res
          .status(401)
          .json({ success: false, message: 'Недействительный токен' })
      } else {
        // если токен действителен, сохраняем раскодированные данные в объекте запроса и переходим к следующему middleware
        req.user = decoded
        next()
      }
    })
  } else {
    // если токен не предоставлен, отправляем ответ 401
    res.status(401).json({ success: false, message: 'Требуется токен доступа' })
  }
}

module.exports = authenticateToken
