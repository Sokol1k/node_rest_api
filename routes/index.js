const express = require("express");
const router = express.Router();
const { login, logout } = require('../controllers/authorization');
const order = require('../controllers/order');

router.post("/login", login);
router.post("/logout", logout);
router.get('/order', order.index);
router.post('/order', order.store);
router.put('/order/:id', order.update);

module.exports = router;
