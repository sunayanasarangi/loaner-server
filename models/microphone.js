
const mongoose = require('mongoose');

const microphoneSchema = new mongoose.Schema({
    prod_id: String,
    title: String,
    product_series: String,
    form_factor: String,
    life_cycle_status: String,
    frequency_style: String,
    polar_patterns: [String],
    transducer_type: String,
    connectors: [String],
    available_wireless: Boolean,
    image: String,
    tobe_discontinued: Boolean,
    sound_source: [{_id:false,
                    name: String, 
                    weight: String}],
    environments: [{_id:false,
                    name: String, 
                    weight: String}],
    industry: [{_id:false,
                name: String, 
                weight: String}]
})

//compile the schema to a model (is a class not an object)
const Microphone = mongoose.model('Microphones', microphoneSchema);

exports.Microphone = Microphone; 
