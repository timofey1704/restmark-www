const express = require('express')
const router = express.Router()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

router.get('/', async (req, res) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
        SELECT
            p.id AS product_id,
            p.title,
            p.country_prod,
            c.id AS collection_id,
            c.name AS collection_name,
            c.price,
            c.discount_price,
            c.discount_percent,
            ph.id AS photo_id,
            ph.filename,
            ph.path
        FROM
            products p
        LEFT JOIN
            collections c ON p.id = c.product_id
        LEFT JOIN
            photos ph ON c.id = ph.collection_id
        ORDER BY
            p.id, c.id, ph.id;
    `)

    // формат данных для удобства фронта
    const products = {}

    result.rows.forEach((row) => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          id: row.product_id,
          title: row.title,
          country_prod: row.country_prod,
          collections: [],
        }
      }

      // проверяем, существует ли уже коллекция с этим ID в массиве
      let collection = products[row.product_id].collections.find(
        (col) => col.id === row.collection_id
      )

      if (!collection) {
        // если коллекция еще не добавлена, добавляем новую
        collection = {
          id: row.collection_id,
          name: row.collection_name,
          price: row.price,
          discount_price: row.discount_price,
          discount_percent: row.discount_percent,
          photos: [],
        }
        products[row.product_id].collections.push(collection)
      }

      // добавляем фото, если оно есть
      if (row.photo_id) {
        collection.photos.push({
          id: row.photo_id,
          filename: row.filename,
          path: row.path,
        })
      }
    })

    // преобразуем объект в массив и отправляем результат
    res.json(Object.values(products))
  } finally {
    client.release()
  }
})

module.exports = router
