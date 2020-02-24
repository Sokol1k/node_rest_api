const express = require("express");
const router = express.Router();
const authorization = require('../controllers/authorization');
const order = require('../controllers/order');
const check = require('../controllers/check');

router.post("/login", authorization.login);
router.get('/orders', order.index);
router.post('/orders', order.store);
router.put('/orders/:id', order.update);
router.post('/checks', check.store);
router.get('/checks/:id', check.show);

module.exports = router;
