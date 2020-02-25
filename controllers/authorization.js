require("dotenv").config();
const db = require("../database");
const jwt = require("jsonwebtoken");

/**
 * Method for user authorization.
 */
const login = function(req, res) {
  // take the data from the database
  db("users")
    .innerJoin("roles", "users.role_id", "roles.id")
    .where({ email: req.body.email })
    .select(
      "users.id",
      "users.email",
      "users.name",
      "users.role_id",
      "roles.name as role"
    )
    .then(user => {
      // user exists or not?
      if (user.length) {
        // create a token
        jwt.sign(
          { user: user[0] },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h"
          },
          (err, token) => {
            // send token to client
            res.send({ token });
          }
        );
      } else {
        // send an error message
        return res
          .status(400)
          .send({ message: "Incorrect login information entered." });
      }
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

module.exports = {
  login
};
