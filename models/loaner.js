
const mongoose = require('mongoose');

const loanerSchema = new mongoose.Schema({
    serial_number: String,
    sku: String,
    status: String
})

//compile the schema to a model (is a class not an object)
const Loaner = mongoose.model('Loaner', loanerSchema);

exports.Loaner = Loaner; 
