const { check, validationResult } = require("express-validator");
const moment = require("moment");

module.exports = {
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    } else if(moment(req.query.from).isAfter(moment(req.query.to))) {
      return res.status(422).send({ message: "Date from greater than to." });
    } 
    else {
      var role = req.cookies["role"];
      if (role == 2 || role == 3) {
        next();
      } else {
        return res.status(401).send({
          message: "User does not have permission to use this method."
        });
      }
    }
  }
};
