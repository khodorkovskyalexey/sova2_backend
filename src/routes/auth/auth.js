const router = require('koa-router')();
const { User } = require('../../database/db');

router
    .post('/auth', async (ctx) => {
        const { email } = ctx.request.body
        const { password } = ctx.request.body
        const user = await User.findOne({ where: { email, password },
            attributes: ['fio', 'token'] })
        try {
            const { fio } = user
            const { token } = user
            ctx.body = { fio, token }
        } catch (err) {
            throw new Error('Email or password is wrong')
        }
  })

module.exports = router
