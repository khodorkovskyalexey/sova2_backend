const router = require('koa-router')()
const { Test } = require('../../database/db')

//middlewares
const sudo_test = require('../../middlewares/find_test_with_auth')

router
    .del('/:token/tests/:test_id', sudo_test, async ctx => {
        const { id } = ctx.request.body['test']
        await Test.destroy({ where: { id } })
    })

module.exports = router
