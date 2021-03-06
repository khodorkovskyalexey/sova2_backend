const router = require('koa-router')();
const { v5: uuidv5 } = require('uuid');
const { User } = require('../../database/db');
const { TOKEN_NAMESPACE } = require('../../configs/env');

router
    .post('/register', async (ctx) => {
        const token = uuidv5(ctx.request.body["email"], TOKEN_NAMESPACE)
        await User
            .findOrCreate({ where: { email: ctx.request.body["email"] } })
            .then(([user, created]) => {
                if (created) {
                    const updateData = {
                        token,
                        fio: ctx.request.body["fio"],
                        password: ctx.request.body["password"],
                    }
                    User.update(updateData, { where: { id: user.id } })
                    ctx.body = { token, status: 200 }
                } else {
                    throw new Error('This email is busy')
                }
            })
    })

module.exports = router;
