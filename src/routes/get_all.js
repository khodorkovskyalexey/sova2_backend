const router = require('koa-router')();
const {
  User, Test, Question, Answer,
} = require('../database/db');

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
  });

module.exports = router;
