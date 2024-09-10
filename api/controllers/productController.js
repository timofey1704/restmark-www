const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// создаем новый продукт
exports.createProduct = async (req, res) => {
  const { title, country_prod, category, collections } = req.body
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const productResult = await client.query(
      'INSERT INTO products (title, country_prod, category) VALUES ($1, $2, $3) RETURNING *',
      [title, country_prod, category]
    )
    const product = productResult.rows[0]

    for (const collection of collections) {
      const { name, price, discount_price, photos } = collection

      const collectionResult = await client.query(
        'INSERT INTO collections (name, price, discount_price, product_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, price, discount_price, product.id]
      )
      const collectionData = collectionResult.rows[0]

      for (const photo of photos) {
        const { filename, path } = photo

        await client.query(
          'INSERT INTO photos (filename, path, collection_id) VALUES ($1, $2, $3)',
          [filename, path, collectionData.id]
        )
      }
    }

    await client.query('COMMIT')
    res.status(201).json(product)
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error creating product:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.release()
  }
}
// изменяем существующий продукт
exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const { title, country_prod, category, collections } = req.body
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const productResult = await client.query(
      'UPDATE products SET title = $1, country_prod = $2, category = $3 WHERE id = $4 RETURNING *',
      [title, country_prod, category, id]
    )

    if (productResult.rows.length === 0) {
      await client.query('ROLLBACK')
      return res.status(404).json({ message: 'Product not found' })
    }

    await client.query(
      'DELETE FROM photos WHERE collection_id IN (SELECT id FROM collections WHERE product_id = $1)',
      [id]
    )
    await client.query('DELETE FROM collections WHERE product_id = $1', [id])

    for (const collection of collections) {
      const { name, price, discount_price, photos } = collection

      const collectionResult = await client.query(
        'INSERT INTO collections (name, price, discount_price, product_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, price, discount_price, id]
      )
      const collectionData = collectionResult.rows[0]

      for (const photo of photos) {
        const { filename, path } = photo

        await client.query(
          'INSERT INTO photos (filename, path, collection_id) VALUES ($1, $2, $3)',
          [filename, path, collectionData.id]
        )
      }
    }

    await client.query('COMMIT')
    res.json(productResult.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error updating product:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.release()
  }
}

// удаляем существующий продукт
exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(
      'DELETE FROM photos WHERE collection_id IN (SELECT id FROM collections WHERE product_id = $1)',
      [id]
    )
    await client.query('DELETE FROM collections WHERE product_id = $1', [id])

    const productResult = await client.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    )

    if (productResult.rows.length === 0) {
      await client.query('ROLLBACK')
      return res.status(404).json({ message: 'Product not found' })
    }

    await client.query('COMMIT')
    res.status(204).end()
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error deleting product:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    client.release()
  }
}
