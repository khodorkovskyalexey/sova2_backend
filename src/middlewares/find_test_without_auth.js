const { Test } = require('../database/db')
module.exports = async (ctx, next) => {
    ctx.data["test"] = await Test.findOne({
        where: { test_id: ctx.params["test_id"] } })
    if(ctx.request.body["test"] === undefined) {
        throw new Error('Test not found by test_id')
    }
    await next()
}