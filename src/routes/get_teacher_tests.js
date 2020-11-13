const router = require('koa-router')()
const { Test, Question, Answer } = require('../database/db')

//middlewares
const find_user = require('../middlewares/find_tests_author_by_token')
const set_body = require('../middlewares/set_author_in_req_body')

router
    .get('/:token/tests', set_body, find_user, async ctx => {
        ctx.body = await ctx.request.body["author"].getTests({ attributes: ["title", "test_id"] })
    })

module.exports = router
