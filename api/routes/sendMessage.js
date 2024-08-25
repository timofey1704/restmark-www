require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/', async (req, res) => {
  const message = req.body.message

  if (!message) {
    return res.status(400).send('No message provided')
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
      }
    )

    res.send('Message sent successfully')
  } catch (error) {
    console.log('Error sending message:', error.message)

    if (error.response) {
      console.log('Error details:', error.response.data)
    }

    res.status(500).send(`Failed to send message: ${error.message}`)
  }
})

module.exports = router
