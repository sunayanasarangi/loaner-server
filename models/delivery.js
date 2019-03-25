
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    status: String,
    delivery_number: String,
    materials: [],
    picking_list:[],
    picking_list_itemised:[],
    created_at: Date
})

//compile the schema to a model (is a class not an object)
const Delivery = mongoose.model('Delivery', deliverySchema);

exports.Delivery = Delivery; 
