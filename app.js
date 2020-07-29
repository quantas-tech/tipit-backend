require('dotenv').config()

// Main app requirements
const express = require('express')
const bodyParser = require("body-parser")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const morgan = require('morgan')

const port = process.env.PORT
const app = express()
const mongoose = require('./config/mongoose')
const keycloak = require('./config/keycloak')

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection })

// Session mapping
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore
}))

// Main app middleware registations
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors())
app.use(morgan('dev'))
app.use( keycloak.middleware() )

// Routes registers
app.use('/api',require('./routes/api'))
app.use(express.static('public'))

// Main server listener
const server = app.listen(port, console.log(`App listening at http://localhost:${port}`))

module.exports = app
