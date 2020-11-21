const { User } = require('../database/db')
module.exports = async (ctx, next) => {
    try {
        const author = await User.findOne({ where: { token: ctx.params["token"] } })
        ctx.request.body["test"] = (await author.getTests({
            where: { test_id: ctx.params["test_id"] } }))[0]
        if (ctx.request.body["test"] == null) {
            throw new Error()
        }
    } catch(err) {
        throw new Error('Token or test_id is wrong')
    }
    await next()
}