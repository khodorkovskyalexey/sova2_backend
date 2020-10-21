const Koa = require('koa')
const logger = require('koa-morgan')
const cors = require('koa-cors')
const server = new Koa()

const port = process.env.PORT || 8081
server
    //cors
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*")
        ctx.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        )
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
        await next()
    })
    .use(cors())
    //routes
    //others
    .use(logger("dev"))
    .listen(port, () => {
        console.log("Server listening on port: " + port)
    })
