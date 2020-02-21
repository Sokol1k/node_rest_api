const express = require("express");
const router = express.Router();
const { rules, middleware} = require('./authorization');

router.post('/login', rules, middleware);

module.exports = router;
