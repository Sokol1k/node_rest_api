const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = {
  rules: [
    check("order_id", "Order id is not valid")
      .not()
      .isEmpty()
      .isNumeric()
  ],
  middleware: function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else {
      let role = jwt.decode(req.token).user.role_id;
      if (role == 2) {
        next();
      } else {
        return res.status(403).send({
          message: "User does not have permission to use this method."
        });
      }
    }
  }
};
