module.exports = async (ctx, next) => {
    ctx.request.body["test"] = (await ctx.request.body["author"].getTests({
        where:{ test_id: ctx.params["test_id"] } }))[0]
    if(ctx.request.body["test"] === undefined) {
        throw new Error('Test not found by test_id')
    }
    await next()
}