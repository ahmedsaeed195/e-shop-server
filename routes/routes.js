const express = require('express')

const ProductRouter = require('./productRouter')

const Router = express.Router()

Router.get('', (req, res) => {
    res.send('Connection established')
})

Router.use('/product', ProductRouter)

module.exports = Router