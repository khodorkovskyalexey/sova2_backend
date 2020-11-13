const router = require('koa-router')()

//middlewares
const find_user = require('../middlewares/find_tests_author_by_token')
const set_body = require('../middlewares/set_author_in_req_body')

router
    .get('/:token/tests', set_body, find_user, async ctx => {
        const tests = await ctx.request.body["author"].getTests({ attributes: ["title", "test_id", "subject"] })
        var res = []
        var subject = []
        for (i in tests) {
            var pos = subject.indexOf(tests[i].subject)
            if(pos === -1) {
                subject.push(tests[i].subject)
                res.push({
                    subject: tests[i].subject,
                    tests: [{
                        title: tests[i].title,
                        test_id: tests[i].test_id
                    }]
                })
            } else {
                res[pos].tests.push({
                    title: tests[i].title,
                    test_id: tests[i].test_id
                })
            }
        }
        ctx.body = res
    })

module.exports = router
