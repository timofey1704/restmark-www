const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// CRUD маршруты для админки
router.post('/create', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
