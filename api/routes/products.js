const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authenticateToken = require('../middlewares/authMiddleware')

// CRUD маршруты для админки
router.post('/create', authenticateToken, productController.createProduct)
router.put('/:id', authenticateToken, productController.updateProduct)
router.delete('/:id', authenticateToken, productController.deleteProduct)
router.get('/get', authenticateToken, productController.getProducts)

module.exports = router
