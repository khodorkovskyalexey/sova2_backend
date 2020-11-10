const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Question = sequelize.define('question', {
    text: Sequelize.STRING,
})

module.exports = Question
