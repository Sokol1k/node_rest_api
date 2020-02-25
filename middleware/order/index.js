const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports = {
  // validation rules
  rules: [
    check("status", "Status is not valid")
      .optional()
      .isInt(),
    check("from", "From is not valid")
      .optional()
      .isISO8601()
      .toDate(),
    check("to", "To is not valid")
      .optional()
      .isISO8601()
      .toDate()
  ],
  middleware: function(req, res, next) {
    // get validation errors
    const errors = validationResult(req);
    // errors exists or not?
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }
    // date from more than to?
    else if (moment(req.query.from).isAfter(moment(req.query.to))) {
      return res.status(422).send({ message: "Date from greater than to." });
    } else {
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
  }
};
