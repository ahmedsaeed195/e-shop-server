const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Could not connect to MongoDB', err))

module.exports = mongoose