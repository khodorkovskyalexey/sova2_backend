const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const { Test, Question, Answer } = require('../database/db');

// middlewares
const find_user = require('../middlewares/find_tests_author_by_token');

router

  .post('/test', find_user, async (ctx) => {
    const test_id = uuidv4(); // "c164e4f8-8ec3-4422-8302-21d3e708941a"
    const test = await Test.create({
      test_id,
      title: ctx.request.body.title,
      subject: ctx.request.body.subject,
    });
    await test.setUser(ctx.request.body.author);

    .post('/tests', find_user, async ctx => {
        const test_id = uuidv4() //"c164e4f8-8ec3-4422-8302-21d3e708941a"
        const test = await Test.create({
            test_id,
            title: ctx.request.body["title"],
            subject: ctx.request.body["subject"]
        })
        await test.setUser(ctx.request.body['author'])


    const questions_list = ctx.request.body.questions;
    for (const i in questions_list) {
      const question = await Question.create({ text: questions_list[i].text });
      await question.setTest(test);

      const answers_list = questions_list[i].answers;
      for (const j in answers_list) {
        const answer = await Answer.create({
          text: answers_list[j].text,
          isTrue: answers_list[j].is_it_true,
        });
        await answer.setQuestion(question);
      }
    }
    ctx.body = { test_id };
  });

module.exports = router;
