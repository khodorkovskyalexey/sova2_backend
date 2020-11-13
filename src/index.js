const Koa = require('koa')
const logger = require('koa-morgan')
const cors = require('koa-cors')
const bodyParser = require("koa-body")()
const errorMiddleware = require('./middlewares/error')
const server = new Koa()

//routes
const register_router = require('./routes/register')
const auth_router = require('./routes/auth')
const new_test_router = require('./routes/new_test')

const port = process.env.PORT || 8081
server
    .use(errorMiddleware)
    //cors

    .use(cors())
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*")
        ctx.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        )
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
        await next()
    })
    //bodyparser
    .use(bodyParser)
    //routes
    .use(register_router.routes())
    .use(auth_router.routes())
    .use(new_test_router.routes())
    //others
    .use(logger("dev"))
    .listen(port, () => {
        console.log("Server listening on port: " + port)
    })

if(process.env.NODE_ENV !== "production") {
    const get_all_router = require('./routes/get_all')
    server.use(get_all_router.routes())
}