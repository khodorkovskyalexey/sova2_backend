module.exports = async (ctx, next) => {
    ctx.request.body["author"] = ctx.params["token"]
    console.log(ctx.params["token"])
    console.log(ctx.request.body["author"])
    await next()
}