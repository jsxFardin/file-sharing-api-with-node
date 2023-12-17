const express = require('express');
const routes = require('../routes');
const error = require('../app/middlewares/error.middleware');

/**
* Express instance
* @public
*/
const app = express();

// JSON parser
app.use(express.json());

// mount api routes
app.use('/', routes);

// 404 handler
app.use(error.notFound);

// error handler
app.use(error.handler);

module.exports = app;