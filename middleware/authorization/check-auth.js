module.exports = {
  middleware: function(req, res, next) {
    if (req.path == "/login") {
      next();
    } else {
      // get auth header value
      const bearerHeader = req.headers["authorization"];
      // check if bearer is undefinde
      if (typeof bearerHeader !== "undefined") {
        // split at the space
        const bearer = bearerHeader.split(" ");
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        next();
      } else {
        return res.status(403).send({ message: "User is not logged in." });
      }
    }
  }
};
