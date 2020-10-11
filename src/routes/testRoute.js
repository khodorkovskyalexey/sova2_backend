const router = require('koa-router')()
const bodyParser = require('koa-body')()
require('dotenv').config()

router
    .post('/test', bodyParser, async ctx => {
        ctx.body = ctx.request.body
    })
    .get('/test', async ctx => {
        ctx.body = {
            to: "Serega",
            from: "Leha",
            message: "Salam alleikum",
            level_of_respect: 1000,
        }
    })

module.exports = router