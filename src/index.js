const Koa = require('koa');
const logger = require('koa-morgan');
const cors = require('koa-cors');
const bodyParser = require('koa-body')();

const path = require('path');
const fs = require('fs');

// Middleware
const serve = require('koa-static');
const errorMiddleware = require('./middlewares/error');

const server = new Koa();

// routes
const register_router = require('./routes/register');
const auth_router = require('./routes/auth');
const new_test_router = require('./routes/new_test');
const teacher_tests_router = require('./routes/teacher_tests')
const student_test_router = require('./routes/student_test')
const test_result_router = require('./routes/get_test_result')

const port = process.env.PORT || 8081;
server
    .use(errorMiddleware)
    // cors
    .use(cors())
    .use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        await next();
    })
    // bodyparser
    .use(bodyParser)
    // routes
    .use(register_router.routes())
    .use(auth_router.routes())
    .use(new_test_router.routes())
    .use(teacher_tests_router.routes())
    .use(student_test_router.routes())
    .use(test_result_router.routes())
    // others
    .use(logger('dev'))
    .listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });

if (process.env.NODE_ENV !== 'production') {
    const get_all_router = require('./routes/get_all');
    server.use(get_all_router.routes());
} else {
    // production mode
    const router = require('koa-router')()
    server.use(serve(`${__dirname}../public`));
    router.get('/', (ctx) => {
        ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8');
    });
    server.use(router.routes());
}