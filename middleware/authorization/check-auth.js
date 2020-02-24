module.exports = {
  middleware: function(req, res, next) {
    if (req.path == "/login") {
      next();
    } else {
      const bearerHeader = req.headers['authorization'];
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
      } else {
        return res.status(403).send({ message: "User is not logged in." });
      }
    }
  }
};
