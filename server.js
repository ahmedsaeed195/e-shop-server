const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')

const Router = require('./routes/routes')
require('dotenv').config()

const app = express()

if (app.get('env') === 'Development') {
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

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', Router)

app.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1); // mandatory (as per the Node.js docs)
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))