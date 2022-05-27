const express = require('express')

const Router = express.Router()

Router.get('', (req, res) => {
    res.json({
        message: 'Connection established'
    })
})

module.exports = Router