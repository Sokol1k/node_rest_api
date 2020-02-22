const express = require("express");
const router = express.Router();
const checkAuth = require('./authorization/check-auth');
const auth = require('./authorization/authorization');
const orderIndex = require('./order/index');
const orderStore = require('./order/store');
const orderUpdate = require('./order/update');
const checkStore = require('./check/store');


router.use(checkAuth.middleware);
router.post('/login', auth.rules, auth.middleware);
router.get('/order', orderIndex.rules, orderIndex.middleware);
router.post('/order', orderStore.rules, orderStore.middleware);
router.put('/order/:id', orderUpdate.rules, orderUpdate.middleware);
router.post('/check', checkStore.middleware);

module.exports = router;
