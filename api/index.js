require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const sendMessageRoute = require('./routes/sendMessage')
const textRoute = require('./routes/texts')
const productsRoute = require('./routes/products')
const salesRoute = require('./routes/sales')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/send-message', sendMessageRoute)
app.use('/api/texts', textRoute)
app.use('/api/products', productsRoute)
app.use('/api/sales', salesRoute)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
