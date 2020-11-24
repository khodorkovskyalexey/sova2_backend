const sequelize = require('./sequelize_conf')

const User = require('./models/User')

const Answer = require('./models/Answer')
const Question = require('./models/Question')
const Test = require('./models/Test')

const Result = require('./models/Result')

Question.hasMany(Answer)
Answer.belongsTo(Question)
Test.hasMany(Question)
Question.belongsTo(Test)
User.hasMany(Test)
Test.belongsTo(User)
Test.hasMany(Result)
Result.belongsTo(Test)

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        console.log("Tables has been synced")
    })
    .catch(err => {
        throw err
    })

module.exports = {
    User,
    Answer,
    Question,
    Test,
    Result
}
