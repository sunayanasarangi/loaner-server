
const winston = require('winston');
const mongoose = require('mongoose');
const microphones = require('./routes/microphones');
const express = require('express');
const app = express();

require('./startup/db')();

/*mongoose.connect('mongodb://localhost/microphones')
    .then(() => console.log('Connected to MongoDB Filter'))
    .catch(err => console.error('could not connect to MongoDB...', err));
   */ 

app.use(express.json());
app.use('/api', microphones);

const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}...`));
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;