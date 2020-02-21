const express = require("express");
const router = express.Router();
const checkAuth = require('./authorization/check-auth');
const auth = require('./authorization/authorization');
const indexStore = require('./order/index');
const orderStore = require('./order/store');


router.use(checkAuth.middleware);
router.post('/login', auth.rules, auth.middleware);
router.get('/order', indexStore.rules, indexStore.middleware);
router.post('/order', orderStore.rules, orderStore.middleware);

module.exports = router;
