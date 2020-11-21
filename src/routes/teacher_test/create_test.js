const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const { Test, Question, Answer } = require('../../database/db');

// middlewares
const find_author = require('../../middlewares/find_author');

router
    .post('/:token/tests', find_author, async (ctx) => {
        console.log(1)
        const test_id = uuidv4()
        const test = await Test.create({
            test_id,
            title: ctx.request.body.title,
            subject: ctx.request.body.subject,
        })
        console.log(test)
        await test.setAuthor(ctx.request.body["author"])

        const questions_list = ctx.request.body.questions
        for (const i in questions_list) {
            const question = await Question.create({ text: questions_list[i].text })
            await question.setTest(test)

            const answers_list = questions_list[i].answers
            for (const j in answers_list) {
                const answer = await Answer.create({
                    text: answers_list[j].text,
                    isTrue: answers_list[j].is_it_true,
                })
                await answer.setQuestion(question);
            }
        }
        ctx.body = { test_id };
    });

module.exports = router
