const express = require("express");
const router = express.Router();
const checkAuth = require('./check-auth');
const auth = require('./authorization');

router.use(checkAuth.middleware);
router.post('/login', auth.rules, auth.middleware);

module.exports = router;
