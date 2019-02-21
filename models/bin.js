
const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    bin: String,
    sequence: Number
})

//compile the schema to a model (is a class not an object)
const Bin = mongoose.model('Bin', binSchema);

exports.Bin = Bin; 