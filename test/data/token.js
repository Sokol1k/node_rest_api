require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("./users.json");

function token(email) {
  return new Promise(function(resolve, reject) {
    jwt.sign({ user: users[email] }, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = token;
