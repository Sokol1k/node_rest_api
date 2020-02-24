require("dotenv").config();
const db = require("../database");
const jwt = require('jsonwebtoken');

const login = function(req, res) {
  db("users")
    .innerJoin("roles", "users.role_id", "roles.id")
    .where({ email: req.body.email })
    .select("users.id", "users.email", "users.name", "users.role_id", "roles.name as role")
    .then(user => {
      if (!user.length) {
        return res
          .status(400)
          .send({ message: "Incorrect login information entered." });
      }
      jwt.sign({user: user[0]}, process.env.SECRET_KEY, (err, token) => {
        res.send({token})
      })
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

module.exports = {
  login,
};
