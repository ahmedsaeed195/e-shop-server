const express = require('express')

const ProductsRouter = require('./productsRouter')

const Router = express.Router()

Router.get('', (req, res) => {
    res.send('Connection established')
})

Router.use('/products', ProductsRouter)

module.exports = Router