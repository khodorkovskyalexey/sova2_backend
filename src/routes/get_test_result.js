const router = require('koa-router')()
const { Test, Answer } = require('../database/db')

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

router
    .post('/tests/:test_id', async ctx => {
        const true_questions_answer = await (await Test.findOne({ where: { test_id: ctx.params["test_id"] } }))
            .getQuestions({ attributes: ["id"],
                include: { model: Answer, where: { isTrue: true }, attributes: ["id"] } })
        const student_answers = ctx.request.body["questions"]
        let mark = 0
        for (i in true_questions_answer) {
            const question = student_answers.find(item => item.id === true_questions_answer[i].id)
            if (question !== undefined) {
                mark += question_is_true(true_questions_answer[i].dataValues, question.answers)
            }
        }
        mark *= 100 / true_questions_answer.length
        ctx.body = { mark }
    })

module.exports = router;
