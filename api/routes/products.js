const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// CRUD маршруты для админки
router.post('/create', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

// получаем все существующие продукты для search page
router.get('/', productController.getProducts)

// отдаем баннеры на главную страницу
router.get('/banners', productController.getBanners)

module.exports = router
