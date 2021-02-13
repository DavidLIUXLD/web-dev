const router = require('koa-router')();
const controller = require('../../controller/index')

// @route   GET api/profile/me 
router.get('/api/profile', controller.getProfile);

module.exports = router;
