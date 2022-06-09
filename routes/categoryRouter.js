const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const CategoryValidator = require('../middleware/validation/category/CategoryValidator')
const IdValidator = require('../middleware/validation/IdValidator')

const CategoryRouter = express.Router()

//TODO: Swagger Docs for Category API
CategoryRouter.get('/', CategoryController.index)
CategoryRouter.get('/active', CategoryController.indexActive)
CategoryRouter.post('/', CategoryValidator, CategoryController.store)
CategoryRouter.put('/:id', IdValidator, CategoryValidator, CategoryController.update)
CategoryRouter.delete('/:id', IdValidator, CategoryController.delete)

module.exports = CategoryRouter

