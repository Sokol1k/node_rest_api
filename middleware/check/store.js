module.exports = {
  middleware: function(req, res, next) {
    var role = req.cookies["role"];
    if (role == 2) {
      next();
    } else {
      return res.status(401).send({
        message: "User does not have permission to use this method."
      });
    }
  }
};
