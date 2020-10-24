const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const User = sequelize.define('user', {
    token: Sequelize.UUID,
    fio: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
})

module.exports = User
