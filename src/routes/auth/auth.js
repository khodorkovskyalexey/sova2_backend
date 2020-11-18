const router = require('koa-router')();
const { User } = require('../../database/db');

router
  .post('/auth', async (ctx) => {
    const { email } = ctx.request.body;
    const { password } = ctx.request.body;
    const user = await User.findOne({ where: { email, password }, attributes: ['fio', 'token'] });
    if (user == null) {
      ctx.body = {
        fio: '',
        token: '',
        status: 400,
      };
    } else {
      const { fio } = user;
      const { token } = user;
      ctx.body = { fio, token, status: 200 };
    }
  });

module.exports = router;
