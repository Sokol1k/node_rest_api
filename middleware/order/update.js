const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
    } else if (req.body.status < 1 || req.body.status > 3) {
      return res.status(422).send({ message: "Incorrect status entered." });
    } else {
      let role = jwt.decode(req.token).user.role_id;
      if (role == 1 || role == 2) {
        next();
      } else {
        return res.status(403).send({
          message: "User does not have permission to use this method."
        });
      }
    }
  }
};
