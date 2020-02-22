const express = require("express");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const middleware = require('./middleware');
const routes = require("./routes");

const app = express();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", middleware);
app.use("/api", routes);

app.use(function(req, res) {
  res.status(404).send({ message: "Page not found" });
});

module.exports = app;
