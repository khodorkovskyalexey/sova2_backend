module.exports = async (ctx, next) => {
    ctx.request.body["author"] = ctx.params["token"]
    await next()
}