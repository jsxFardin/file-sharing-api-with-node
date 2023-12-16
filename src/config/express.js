const express = require('express');
const routes = require('../routes');

/**
* Express instance
* @public
*/
const app = express();

// mount api v1 routes
app.use('/v1', routes);

module.exports = app;