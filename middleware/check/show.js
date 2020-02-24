const jwt = require('jsonwebtoken');

module.exports = {
  middleware: function(req, res, next) {
    let role = jwt.decode(req.token).user.role_id;
    if (role == 2) {
      next();
    } else {
      return res.status(403).send({
        message: "User does not have permission to use this method."
      });
    }
  }
};
