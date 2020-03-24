const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Create server
const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

// start application
app.listen(process.env.PORT, function () {
    console.log('Server listening on port: ' + process.env.PORT);
});