
const winston = require('winston');
const mongoose = require('mongoose');
const loaners = require('./routes/loaners');
const deliveries = require('./routes/deliveries');
const bins = require('./routes/bins');
const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/prod')(app);

/*
mongoose.connect('mongodb://localhost/microphones')
    .then(() => console.log('Connected to MongoDB Filter'))
    .catch(err => console.error('could not connect to MongoDB...', err));
*/    

app.use(express.json());
app.use('/api/loaners', loaners);
app.use('/api/deliveries', deliveries);
app.use('/api/bins', bins);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
//app.listen(port, () => winston.info(`Listening on port ${port}...`));
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;