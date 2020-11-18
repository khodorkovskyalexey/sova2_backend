const { User } = require('../database/db')
module.exports = async (ctx, next) => {
    ctx.request.body["author"] = await User.findOne({ where: { token: ctx.params["token"] } })
    if(ctx.request.body["author"] == null) {
        throw new Error('Author not found by token')
    }
    await next()
}