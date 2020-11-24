const router = require('koa-router')()

//middlewares
const sudo_test = require('../../middlewares/find_test_with_auth')

router
    .get('/:token/result/:test_id', sudo_test, async ctx => {
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
