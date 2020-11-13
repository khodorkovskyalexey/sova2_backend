//параметры запроса взял отсюда https://sequelize.org/master/manual/eager-loading.html
const router = require('koa-router')();
const { User, Test, Question, Answer } = require('../database/db');

router
    .get('/tests/:test_id', async ctx=> {
        const res = await Test.findOne({ where: { test_id: ctx.params["test_id"] },
            attributes: ["title", "subject"],
            include: [
                { model: User, as: "author", attributes: ["fio"] },
                { model: Question, attributes: ["id", "text"],
                    include: { model: Answer, attributes: ["id", "text"] }
                }]
            })
        if(res == null) {
            throw new Error('Test not found by test_id')
        }
        ctx.body = res
    })

module.exports = router