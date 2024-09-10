require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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

app.use(cors())
app.use(bodyParser.json())

app.use('/api/send-message', sendMessageRoute)
app.use('/api/texts', textRoute)
app.use('/api/products', productsRoute)
app.use('/api/sales', salesRoute)
app.use('/api/login', loginRoute)
app.use('/api/customers', customersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/banners', bannersRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
