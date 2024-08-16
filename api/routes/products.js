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
                p.price,
                p.discount_price,
                c.id AS collection_id,
                c.name AS collection_name,
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

    // Форматируем данные для удобства фронтенда
    const products = {}

    result.rows.forEach((row) => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          id: row.product_id,
          title: row.title,
          country_prod: row.country_prod,
          price: row.price,
          discount_price: row.discount_price,
          collections: {},
        }
      }

      if (
        row.collection_id &&
        !products[row.product_id].collections[row.collection_id]
      ) {
        products[row.product_id].collections[row.collection_id] = {
          id: row.collection_id,
          name: row.collection_name,
          photos: [],
        }
      }

      if (row.photo_id) {
        products[row.product_id].collections[row.collection_id].photos.push({
          id: row.photo_id,
          filename: row.filename,
          path: row.path,
        })
      }
    })

    res.json(Object.values(products))
  } finally {
    client.release()
  }
})

module.exports = router
