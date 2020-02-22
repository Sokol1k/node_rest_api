module.exports = {
  middleware: function(req, res, next) {
    var user = req.cookies["user"];
    if (user.role_id == 2) {
      next();
    } else {
      return res.status(401).send({
        message: "User does not have permission to use this method."
      });
    }
  }
};
