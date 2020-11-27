const router = require('express').Router();

router.use('/mobile', require('./api/mobile.routing'));


module.exports = router;
