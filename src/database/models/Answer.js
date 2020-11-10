const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Answer = sequelize.define('answer', {
    text: Sequelize.STRING,
    isTrue: Sequelize.BOOLEAN,
})

module.exports = Answer
