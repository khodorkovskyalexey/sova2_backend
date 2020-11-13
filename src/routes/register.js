const router = require('koa-router')()
const { v5: uuidv5 } = require('uuid')
const { User } = require('../database/db')
const { TOKEN_NAMESPACE } = require('../configs/env')

router
    .post('/register', async ctx => {
        const token = uuidv5(ctx.request.body["email"], TOKEN_NAMESPACE)
        let success = true
        await User
            .findOrCreate({ where: { email: ctx.request.body["email"] } })
            .then(([user, created]) => {
                if(created) {
                    const updateData = {
                        token,
                        fio: ctx.request.body["fio"],
                        password: ctx.request.body["password"]
                    }
                    User.update(updateData, { where: { id: user.id } })
                } else {
                    success = false
                }
            })
        if(success) {
            ctx.body = {
                token,
                status: 200
            }
        } else {
            ctx.body = {
                token: "",
                status: 400
            }
        }
    })

module.exports = router
