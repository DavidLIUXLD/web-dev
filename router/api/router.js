const router = require('koa-router')();
const users = require('./users');

router.get('/', (ctx, next) => {
    return ctx.response.body = `<h1>main page</h1>`;
});

router.use(users.routes(), users.allowedMethods());

module.exports = router;


