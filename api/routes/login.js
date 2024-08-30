const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    // выполняем запрос к базе данных для проверки логина и пароля
    const query =
      'SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1'
    const result = await pool.query(query, [username, password])

    if (result.rows.length === 1) {
      // если найден пользователь с такими данными, проверяем доступы
      const user = result.rows[0]

      if (!user.is_active) {
        return res.status(200).json({
          success: false,
          message: 'Пользователь неактивен',
          reason: 'USER_NOT_ACTIVE',
        })
      }

      // если пользователь активен, генерируем токен
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      // отправляем токен вместе с успешным ответом аутентификации
      res.status(200).json({
        success: true,
        message: 'Авторизация успешна',
        token: token,
        user: user,
      })
    } else {
      // если пользователь не найден, отправляем ошибку
      res
        .status(401)
        .json({ success: false, message: 'Неверный логин или пароль' })
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса к базе данных:', error)
    res.status(500).json({ success: false, message: 'Ошибка при авторизации' })
  }
})

module.exports = router
