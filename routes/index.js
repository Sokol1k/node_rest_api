const express = require("express");
const router = express.Router();
const { login, logout } = require('../controllers/authorization');

// POST route for authorization

router.post("/login", login);

// POST route for deauthorization

router.post("/logout", logout);

module.exports = router;
