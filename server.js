const koa = require('koa2')
const router = require('koa-router')();
app = new koa();
const PORT = process.env.PORT || 5000;
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2</h1>';
});
router.get(' /', async (ctx, next) => {
    ctx.response.body = '<h1>index</h1>';
});
app.listen(PORT, () => {console.log('running on {$PORT}')});
