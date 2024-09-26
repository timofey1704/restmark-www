const { Pool } = require('pg')
const multer = require('multer')
const path = require('path')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// загружаем изображения для хранения на сервере
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '/root/restmark/uploads/')
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

// создаем новый продукт
exports.createProduct = [
  upload.fields([
    { name: 'photos[0]', maxCount: 10 },
    { name: 'photos[1]', maxCount: 10 },
    { name: 'photos[2]', maxCount: 10 },
    { name: 'photos[3]', maxCount: 10 },
    { name: 'photos[4]', maxCount: 10 },
    { name: 'photos[5]', maxCount: 10 },
    { name: 'photos[6]', maxCount: 10 },
    { name: 'photos[7]', maxCount: 10 },
    // и т.д., если ожидаем больше коллекций
  ]), // принимаем несколько изображений с ключами 'photos[0]', 'photos[1]' и т.д.
  async (req, res) => {
    const { title, country_prod, category, collections } = req.body
    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      // вставляем новый продукт
      const productResult = await client.query(
        'INSERT INTO products (title, country_prod, category) VALUES ($1, $2, $3) RETURNING *',
        [title, country_prod, category]
      )
      const product = productResult.rows[0]

      // обрабатываем коллекции
      for (let i = 0; i < collections.length; i++) {
        const collection = collections[i]
        const { name, price, discount_price } = collection

        // вставляем коллекцию, связанную с продуктом
        const collectionResult = await client.query(
          'INSERT INTO collections (name, price, discount_price, product_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, price, discount_price, product.id]
        )
        const collectionData = collectionResult.rows[0]

        //  если есть фотографии для данной коллекции
        const collectionPhotos = req.files[`photos[${i}]`] // получаем файлы для конкретной коллекции

        if (collectionPhotos) {
          for (const file of collectionPhotos) {
            await client.query(
              'INSERT INTO photos (filename, path, collection_id) VALUES ($1, $2, $3)',
              [file.filename, file.path, collectionData.id]
            )
          }
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
  },
]

// изменяем существующий продукт
exports.updateProduct = [
  upload.array('photos'), // Мидлвар для загрузки изображений
  async (req, res) => {
    const { id } = req.params
    const { title, country_prod, category, collections } = req.body
    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      // Обновляем продукт
      const productResult = await client.query(
        'UPDATE products SET title = $1, country_prod = $2, category = $3 WHERE id = $4 RETURNING *',
        [title, country_prod, category, id]
      )

      if (productResult.rows.length === 0) {
        await client.query('ROLLBACK')
        return res.status(404).json({ message: 'Product not found' })
      }

      // Удаляем старые фотографии и коллекции
      await client.query(
        'DELETE FROM photos WHERE collection_id IN (SELECT id FROM collections WHERE product_id = $1)',
        [id]
      )
      await client.query('DELETE FROM collections WHERE product_id = $1', [id])

      // Обрабатываем новые коллекции и фотографии
      for (const collection of collections) {
        const { name, price, discount_price } = collection

        // Вставляем новую коллекцию
        const collectionResult = await client.query(
          'INSERT INTO collections (name, price, discount_price, product_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, price, discount_price, id]
        )
        const collectionData = collectionResult.rows[0]

        // Обрабатываем фотографии
        const uploadedFiles = req.files // Файлы, загруженные через 'multer'

        for (const file of uploadedFiles) {
          await client.query(
            'INSERT INTO photos (filename, path, collection_id) VALUES ($1, $2, $3)',
            [file.filename, file.path, collectionData.id]
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
  },
]

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

//получаем все продукты
exports.getProducts = async (req, res) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
        SELECT
          p.id AS product_id,
          p.title,
          p.country_prod,
          p.category,
          p.pdf,
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

    const products = {}

    result.rows.forEach((row) => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          id: row.product_id,
          title: row.title,
          country_prod: row.country_prod,
          category: row.category,
          pdf: row.pdf,
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
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error)
    res.status(500).json({ error: 'Ошибка выполнения запроса' })
  } finally {
    client.release()
  }
}
