const { check, validationResult } = require("express-validator");

module.exports = {
  rules: [
    check("status", "Status is not valid")
      .optional()
      .isInt()
  ],
  middleware: function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else if (req.query.status < 1 || req.query.status > 3) {
      return res.status(422).send({ message: "Incorrect status entered." });
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
