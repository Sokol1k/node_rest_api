const express = require("express");
const router = express.Router();
const { login, logout } = require('../controllers/authorization');
const order = require('../controllers/order');
const check = require('../controllers/check');

router.post("/login", login);
router.post("/logout", logout);
router.get('/orders', order.index);
router.post('/orders', order.store);
router.put('/orders/:id', order.update);
router.post('/checks', check.store);

module.exports = router;
