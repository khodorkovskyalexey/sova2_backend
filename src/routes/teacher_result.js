const router = require('koa-router')()

//middlewares
const author_auth = require('../middlewares/find_tests_author_by_token')
const find_test = require('../middlewares/find_test')

router
    .get('/:token/result/:test_id', author_auth, find_test, async ctx => {
        const student_results = await ctx.request.body["test"].getResults({
            attributes: ["fio", "group", "mark"] })
        const res = []
        const groups = []
        for (i in student_results) {
            const pos = groups.indexOf(student_results[i].group)
            if(pos === -1) {
                groups.push(student_results[i].group)
                res.push({
                    group: student_results[i].group,
                    students: [{
                        fio: student_results[i].fio,
                        mark: student_results[i].mark
                    }]
                })
            } else {
                res[pos].students.push({
                    fio: student_results[i].fio,
                    mark: student_results[i].mark
                })
            }
        }
        ctx.body = res
    })

module.exports = router
