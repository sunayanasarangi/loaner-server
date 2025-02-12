
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    status: String,
    delivery_number: String,
    picking_list: [],
    picking_list_header:[],
    picking_list_itemised:[{
        item_number: String,
        material: String,
        bin: String,
        qty: String,
        pick_status: Boolean
    }],
    count_itemised: String,
    created_at: Date
})

//compile the schema to a model (is a class not an object)
//const PickingListItemised = mongoose.model('PickingListItemised', pickingListItemisedSchema);
const Delivery = mongoose.model('Delivery', deliverySchema);

exports.Delivery = Delivery; 
