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
const t = require('./routes/get_teacher_tests')

const port = process.env.PORT || 8081
server
    .use(errorMiddleware)
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
    .use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "credentials": true
    }))
    //bodyparser
    .use(bodyParser)
    //routes
    .use(register_router.routes())
    .use(auth_router.routes())
    .use(new_test_router.routes())
    .use(t.routes())
    //others
    .use(logger("dev"))
    .listen(port, () => {
        console.log("Server listening on port: " + port)
    })

if(process.env.NODE_ENV !== "production") {
    const get_all_router = require('./routes/get_all')
    server.use(get_all_router.routes())
}