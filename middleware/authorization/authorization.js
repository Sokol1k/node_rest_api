const { check, validationResult } = require("express-validator");

module.exports = {
  // validation rules
  rules: [
    check("email", "Your email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail()
  ],
  middleware: function(req, res, next) {
    // get validation errors
    const errors = validationResult(req);
    // errors exists or not?
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else {
      next();
    }
  }
};
