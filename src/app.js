const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// const bodyParser = require('body-parser');

const mongooseConnection = require('./config/mongooseConnection.config')

const app = express()

// rotas da api
const index = require('./routes/index')
const userRoutes = require('./routes/user.routes')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(morgan('dev'))
app.use(cors())

//.set = usado para incluir algum arquivo estático, nesse caso está incluido a conexão com o banco de dados
app.set('mongoose connection', mongooseConnection)

app.use(index)
app.use('/api/v1', userRoutes)

module.exports = app