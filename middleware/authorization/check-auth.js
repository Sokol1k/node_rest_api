module.exports = {
  middleware: function(req, res, next) {
    if (req.path == "/login") {
      next();
    } else {
      var user = req.cookies["user"];
      if (user) {
        next();
      } else {
        return res.status(401).send({ message: "User is not logged in." });
      }
    }
  }
};
