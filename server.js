const express = require('express')
const Router = require('./routes/routes')
const mongoose = require('./config/database')
require('dotenv').config()

const app = express()

app.use('/', Router)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))