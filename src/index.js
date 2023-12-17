const { port, mode } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${mode})`));

/**
* Exports express
* @public
*/
module.exports = app;