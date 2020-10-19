const Koa = require('koa')
const logger = require('koa-morgan')
const cors = require('koa-cors')

const server = new Koa()

const testRoute = require('./routes/testRoute')

const port = process.env.PORT || 8081
server
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*")
        ctx.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        )
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
        await next()
    })
    //routes
    .use(testRoute.routes())
    //others

    .use(logger("dev"))
    .use(cors())
    .listen(port, () => {
        console.log("Server listening on port: " + port)
    })