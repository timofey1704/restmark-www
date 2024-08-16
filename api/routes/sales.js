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

router.post('/', async (req, res) => {
  const client = await pool.connect()
  try {
    const { product_id, collections, sales_available } = req.body

    // проверка что переданные данные валидны
    if (!product_id || !collections || !Array.isArray(collections)) {
      return res.status(400).json({ error: 'Invalid data format' })
    }

    // обновляем флаг sales_available для продукта
    await client.query(
      `
          UPDATE products
          SET sales_available = $1
          WHERE id = $2
        `,
      [sales_available, product_id]
    )

    // обновляем каждую коллекцию в базе данных
    for (const collection of collections) {
      const { id, price, discount_price } = collection

      await client.query(
        `
            UPDATE collections
            SET price = $1, discount_price = $2
            WHERE id = $3 AND product_id = $4
          `,
        [price, discount_price, id, product_id]
      )
    }

    res
      .status(200)
      .json({ message: 'Prices and availability updated successfully' })
  } catch (err) {
    console.error('Error updating prices and availability', err.stack)
    res.status(500).send('Server Error')
  } finally {
    client.release()
  }
})

router.get('/proposals', async (req, res) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
          SELECT
              p.id AS product_id,
              p.title,
              p.country_prod,
              p.sales_available,
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
          WHERE
              p.sales_available = true
          ORDER BY
              p.id, c.id, ph.id;
      `)

    const products = {}

    result.rows.forEach((row) => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          id: row.product_id,
          title: row.title,
          country_prod: row.country_prod,
          sales_available: row.sales_available,
          collections: [],
        }
      }

      let collection = products[row.product_id].collections.find(
        (col) => col.id === row.collection_id
      )
      if (!collection) {
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

      if (row.photo_id) {
        collection.photos.push({
          id: row.photo_id,
          filename: row.filename,
          path: row.path,
        })
      }
    })

    res.json(Object.values(products))
  } catch (err) {
    console.error('Error fetching available products', err.stack)
    res.status(500).send('Server Error')
  } finally {
    client.release()
  }
})

module.exports = router
