require('dotenv').config()

module.exports = {
    DB_CONNECTION: process.env.DB_CONNECTION,
    TOKEN_NAMESPACE: process.env.TOKEN_NAMESPACE,
}