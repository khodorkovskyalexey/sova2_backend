const router = require('koa-router')();
const { User, Test, Question, Answer, Result } = require('../database/db');

router
  .get('/users', async (ctx) => {
    ctx.body = await User.findAll();
  })
  .get('/tests', async (ctx) => {
    ctx.body = await Test.findAll();
  })
  .get('/questions', async (ctx) => {
    ctx.body = await Question.findAll();
  })
  .get('/answers', async (ctx) => {
    ctx.body = await Answer.findAll();
  })
  .get('/results', async ctx => {
    ctx.body = await Result.findAll()
  })

module.exports = router;
