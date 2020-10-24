const sequelize = require('./sequelize_conf')

const User = require('./models/User')

sequelize.sync()

//sequelize.sync({ force: true })

module.exports = {
    User,
}
