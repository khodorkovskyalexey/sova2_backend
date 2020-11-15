const router = require('koa-router')()
const { Answer } = require('../database/db')

function question_is_true(true_answer, student_answer) {
    if(true_answer["answers"].length !== student_answer.length) {
        return false
    }
    for (i in true_answer["answers"]) {
        const true_answer_index = student_answer.findIndex(item => item === true_answer.answers[i].id)
        if(true_answer_index === -1) {
            return false
        }
    }
    return true
}

//middlewares
const find_test = require('../middlewares/find_test')
const check_student_data = require('../middlewares/check_students_data_in_request')

router
    .post('/tests/:test_id', check_student_data, find_test, async ctx => {
        const true_questions_answer = await ctx.request.body["test"].getQuestions({
            attributes: ["id"], include: { model: Answer, where: { isTrue: true },
                attributes: ["id"] } })
        const student_answers = ctx.request.body["questions"]
        let mark = 0
        for (i in true_questions_answer) {
            const question = student_answers.find(item => item.id === true_questions_answer[i].id)
            if (question !== undefined) {
                mark += question_is_true(true_questions_answer[i].dataValues, question.answers)
            }
        }
        const { MAX_MARK } = require('../configs/mark_configs')
        mark *= MAX_MARK / true_questions_answer.length
        mark = ~~mark

        await ctx.request.body["test"].createResult({
            fio: ctx.request.body["student"].fio,
            group: ctx.request.body["student"].group,
            mark
        })
        ctx.body = { mark }
    })

module.exports = router;
