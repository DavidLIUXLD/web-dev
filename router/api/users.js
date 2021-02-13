const router = require('koa-router')();
const controller = require('../../controller/index');

router.prefix('/users')

router.post('/login', controller.login);
router.get('/login', controller.pageLogin);
router.post('/register', controller.register);
router.get('/login', controller.pageLogin);
router.get('/me', controller.getProfile);

module.exports = router;