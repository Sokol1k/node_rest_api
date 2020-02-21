const express = require("express");
const db = require("../database");
const router = express.Router();

// POST route for authorization

router.post("/login", function(req, res) {
  db("users")
    .where({ email: req.body.email })
    .select("*")
    .then(user => {
      if (!user.length) {
        return res
          .status(400)
          .send({ message: "Incorrect login information entered." });
      }
      res.cookie("user", user[0], { maxAge: 24 * 60 * 60 * 1000 });
      res.send(user[0]);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// POST route for deauthorization

router.post("/logout", function(req, res) {
  var user = req.cookies["user"];
  if (user) {
    res.clearCookie("user");
    return res.send({ message: "User successfully logout." });
  } else {
    return res.status(401).send({ message: "User is not logged in." });
  }
});

module.exports = router;
