const jwt = require("jsonwebtoken");

module.exports = {
  middleware: function(req, res, next) {
    // get user role
    let role = jwt.decode(req.token).user.role_id;
    if (role == 1 || role == 3) {
      next();
    } else {
      return res.status(403).send({
        message: "User does not have permission to use this method."
      });
    }
  }
};
