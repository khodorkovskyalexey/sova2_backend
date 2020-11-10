const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Test = sequelize.define('test', {
    token: Sequelize.UUID,
    title: Sequelize.STRING,
    subject: Sequelize.STRING,
})

module.exports = Test
