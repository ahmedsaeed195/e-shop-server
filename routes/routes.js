const express = require('express')

const ProductsRouter = require('./productsRouter')

const Router = express.Router()

Router.get('', (req, res) => {
    res.json({
        message: 'Connection established'
    })
})

Router.use('/products', ProductsRouter)

module.exports = Router