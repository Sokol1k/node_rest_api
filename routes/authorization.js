const express = require("express");
const db = require("../database");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Your email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail()
  ],
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }
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
  }
);

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
