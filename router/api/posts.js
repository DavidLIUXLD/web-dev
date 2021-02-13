const router = require('koa-router')();

router.get('/posts', (ctx, next) => {
    ctx.response.body = '<h1>posts route</h1>';
} );

module.exports = router;