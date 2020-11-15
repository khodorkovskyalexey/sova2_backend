const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Result = sequelize.define('result', {
    fio: Sequelize.STRING,
    group: Sequelize.STRING,
    mark: Sequelize.INTEGER,
})

module.exports = Result
