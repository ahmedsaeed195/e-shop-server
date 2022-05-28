const express = require('express')
const ProductsController = require('../controllers/ProductsController')

const ProductsRouter = express.Router()

ProductsRouter.get('/', ProductsController.index)
ProductsRouter.get('/:id', ProductsController.show)

ProductsRouter.post('/', ProductsController.store)

ProductsRouter.put('/:id', ProductsController.update)
ProductsRouter.put('/:id/status', ProductsController.updateStatus)

ProductsRouter.delete('/:id', ProductsController.delete)

module.exports = ProductsRouter
