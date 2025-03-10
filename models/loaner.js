
const mongoose = require('mongoose');

const loanerSchema = new mongoose.Schema({
    rfid: String,
    sku: String,
    description: String,
    serial_number: String,
    status: String,
    bin: String,
    last_issued_for: String
})

//compile the schema to a model (is a class not an object)
const Loaner = mongoose.model('Loaner', loanerSchema);

exports.Loaner = Loaner; 
