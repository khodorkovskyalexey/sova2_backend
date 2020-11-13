const router = require('koa-router')()
const { User } = require('../database/db')

router
    .post('/auth', async ctx => {
        const email = ctx.request.body["email"]
        const password = ctx.request.body["password"]
        const user = await User.findOne({ where: { email, password }, attributes: ["fio", "token"] })
        if(user == null) {
            ctx.body = {
                fio: "",
                token: "",
                status: 400
            }
        } else {
            const fio = user["fio"]
            const token = user["token"]
            ctx.body = { fio, token, status: 200 }
        }
    })

module.exports = router