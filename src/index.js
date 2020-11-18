const Koa = require('koa');

const path = require('path');
const fs = require('fs');

// Middleware
const cors = require('koa-cors')
const bodyParser = require('koa-body')()
const logger = require('koa-morgan')
const serve = require('koa-static')
const errorMiddleware = require('./middlewares/error');

const server = new Koa();

// routes
const register_router = require('./routes/auth/register')
const auth_router = require('./routes/auth/auth')

const teacher_create_test_router = require('./routes/teacher_test/create_test')
const teacher_see_own_tests_router = require('./routes/teacher_test/see_own_tests')
const teacher_see_result_router = require('./routes/teacher_result/see_results')

const student_take_test_router = require('./routes/student_test/take_test')
const student_send_solution_router = require('./routes/student_test/send_solution')

const get_all_router = require('./routes/get_all')

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

    // routes auth
    .use(register_router.routes())
    .use(auth_router.routes())
    // routes for teacher
    .use(teacher_create_test_router.routes())
    .use(teacher_see_own_tests_router.routes())
    .use(teacher_see_result_router.routes())
    // routes for student
    .use(student_take_test_router.routes())
    .use(student_send_solution_router.routes())

    .listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });

if (process.env.NODE_ENV !== 'production') {
    server
        .use(get_all_router.routes())
        .use(logger('dev'))
} else {
    // production mode
    const router = require('koa-router')()
    server.use(serve(`${__dirname}../public`));
    router.get('/', (ctx) => {
        ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8');
    });
    server.use(router.routes());
}