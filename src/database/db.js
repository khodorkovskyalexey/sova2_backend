const sequelize = require('./sequelize_conf')

const User = require('./models/User')

const Answer = require('./models/Answer')
const Question = require('./models/Question')
const Test = require('./models/Test')

Question.hasMany(Answer)
Answer.belongsTo(Question)
Test.hasMany(Question)
Question.belongsTo(Test)
User.hasMany(Test)
Test.belongsTo(User)

sequelize.sync()

module.exports = {
    User,
    Answer,
    Question,
    Test,
}
