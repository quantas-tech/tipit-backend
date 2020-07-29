const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const Keycloak = require('keycloak-connect')

const mongoose = require('./mongoose')

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection })
const keycloak = new Keycloak({ store: mongoStore })

module.exports = keycloak
