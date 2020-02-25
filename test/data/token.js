require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("./users.json");

function token(email) {
  return jwt.sign({ user: users[email] }, process.env.SECRET_KEY, {
    expiresIn: "1000"
  });
}

module.exports = token;
