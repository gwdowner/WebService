const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const api = require('./routes');

// Create server
const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use('/api', api);

// start application
app.listen(process.env.PORT, function () {
    console.log('Server listening on port: ' + process.env.PORT);
});