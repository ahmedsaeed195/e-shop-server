const mongoose = require('mongoose')
require('dotenv').config()

const DB = () => {
    if (process.env.NODE_ENV === 'Production') {
        return process.env.DB_PROD
    }
    return process.env.DB_DEV
}

const DB_URI = `${process.env.DB_URI}${DB()}`

mongoose.connect(DB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Could not connect to MongoDB', err))

module.exports = mongoose