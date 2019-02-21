
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    delivery_number: String,
    materials: [],
    pickingList:[]
})

//compile the schema to a model (is a class not an object)
const Delivery = mongoose.model('Delivery', deliverySchema);

exports.Delivery = Delivery; 
