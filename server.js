const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const Router = require('./routes/routes')
require('dotenv').config()

const app = express()

if (app.get('env') === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-shop API',
            version: '1.0.0',
            description: 'Express Server API for the E-shop web app'
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.use(express.json())
app.use('/', Router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))