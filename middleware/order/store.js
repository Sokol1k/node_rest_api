const { check, validationResult } = require("express-validator");

module.exports = {
  rules: [
    check("product_id", "Product id is not valid")
      .not()
      .isEmpty()
      .isNumeric()
  ],
  middleware: function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else {
      var user = req.cookies["user"];
      if (user.role == "Кассир") {
        next();
      } else {
        return res.status(401).send({
          message: "User does not have permission to use this method."
        });
      }
    }
  }
};
