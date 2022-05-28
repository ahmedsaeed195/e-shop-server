const express = require('express')
const Router = require('./routes/routes')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

if (app.get('env') === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/', Router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))