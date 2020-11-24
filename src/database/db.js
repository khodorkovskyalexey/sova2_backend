const sequelize = require('./sequelize_conf')

const User = require('./models/User')
const Test = require('./models/Test')
const Question = require('./models/Question')
const Answer = require('./models/Answer')
const Result = require('./models/Result')

User.hasMany(Test, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Test.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Test.hasMany(Question, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Question.belongsTo(Test, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Question.hasMany(Answer, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Answer.belongsTo(Question, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Test.hasMany(Result, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Result.belongsTo(Test, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

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
