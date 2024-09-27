require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const sendMessageRoute = require('./routes/sendMessage')
const textRoute = require('./routes/texts')
const productsRoute = require('./routes/products')
const salesRoute = require('./routes/sales')
const loginRoute = require('./routes/login')
const customersRouter = require('./routes/customers')
const itemsRouter = require('./routes/items')
const bannersRouter = require('./routes/banners')

const authenticateToken = require('./middlewares/authMiddleware')

const app = express()
const port = process.env.PORT || 4000

const corsOptions = {
  origin: function (origin, callback) {
    // разрешаем запросы с локалхоста и продакшн-домена
    const whitelist = ['http://localhost:3000', 'https://restmark.by']
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // разрешаем передачу cookie при необходимости
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(
  '/uploads',
  express.static(path.join(__dirname, '/root/restmark/uploads/'))
)

//! localdev
// app.use(
//   '/uploads',
//   express.static(
//     '/Users/timofey/Desktop/restmark-www/api/controllers/root/restmark/uploads'
//   )
// )

app.use('/api/send-message', sendMessageRoute)
app.use('/api/texts', textRoute)
app.use('/api/products', authenticateToken, productsRoute)
app.use('/api/sales', salesRoute)
app.use('/api/login', loginRoute)
app.use('/api/customers', customersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/banners', bannersRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
