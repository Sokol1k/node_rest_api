const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authorizationRouter = require('./routes/authorization');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authorizationRouter);

app.use(function(req, res) {
    res.status(404).send({message: 'Page not found'})
})

module.exports = app;
