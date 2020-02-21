const { check, validationResult } = require("express-validator");

module.exports = {
  rules: [
    check("status", "Status is not valid")
      .optional()
      .isInt()
      .isNumeric()
  ],
  middleware: function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else {
      var user = req.cookies["user"];
      if (user.role_id == 2) {
        next();
      } else {
        return res.status(401).send({
          message: "User does not have permission to use this method."
        });
      }
    }
  }
};
