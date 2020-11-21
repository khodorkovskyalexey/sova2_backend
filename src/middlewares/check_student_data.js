module.exports = async (ctx, next) => {
    if(ctx.request.body["student"] === undefined) {
        throw new Error('Student field is undefined')
    }
    if(ctx.request.body["student"].fio === undefined) {
        throw new Error('Student fio is undefined')
    }
    if(ctx.request.body["student"].group === undefined) {
        throw new Error('Student group is undefined')
    }
    await next()
}