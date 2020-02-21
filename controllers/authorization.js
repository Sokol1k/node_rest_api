const db = require("../database");

const login = function(req, res) {
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
};

const logout = function(req, res) {
  res.clearCookie("user");
  return res.send({ message: "User successfully logout." });
};

module.exports = {
  login,
  logout
};
