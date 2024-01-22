const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const { cleanupSchedule, clientURL } = require('./vars');
const routes = require('../routes');
const error = require('../app/middlewares/error.middleware');
const { cleanupUploadedFiles } = require('../app/schedulers/fileCleanup');
/**
* Express instance
* @public
*/
const app = express();

// JSON parser
app.use(express.json());

// cors
app.use(cors({
    credentials: true,
    origin: clientURL
}));

// Schedule the cleanup job to run every day at midnight
schedule.scheduleJob(cleanupSchedule, cleanupUploadedFiles);

// mount api routes
app.use('/', routes);

// 404 handler
app.use(error.notFound);

// error handler
app.use(error.handler);

module.exports = app;