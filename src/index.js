const { port, mode } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const error = require('./app/middlewares/error.middleware');

// open mongoose connection
mongoose.connect();



// 404 handler
app.use(error.notFound);

// error handler
app.use(error.handler);

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${mode})`));

/**
* Exports express
* @public
*/
module.exports = app;