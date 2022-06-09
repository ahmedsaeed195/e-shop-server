const express = require('express')

const ProductRouter = require('./productRouter')
const CategoryRouter = require('./categoryRouter')

const Router = express.Router()

Router.get('', (req, res) => {
    res.send('Connection established')
})

Router.use('/product', ProductRouter)
Router.use('/category', CategoryRouter)

module.exports = Router