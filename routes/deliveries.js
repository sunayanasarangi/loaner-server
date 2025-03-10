
const {Delivery} = require('../models/delivery'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET /api/deliveries get all deliveries

router.get('/', async (req, res) => {
    const deliveries = await Delivery.find({});
    res.send(deliveries);
  });

//POST /api/deliveries/delivery post a new delivery if delivery not found, else update the delivery

router.post('/delivery', async (req, res) => {
    let picking_list = [];
    let picking_list_header = [];
    let picking_list_itemised = [];

    for (var i in req.body.picking_list)
        picking_list.push(req.body.picking_list[i]);
    for (var j in req.body.picking_list_header)
        picking_list_header.push(req.body.picking_list_header[j]);
    for (var k in req.body.picking_list_itemised)
        picking_list_itemised.push(req.body.picking_list_itemised[k]);

    const delivery = await Delivery.update(
        { delivery_number: req.body.delivery_number },
        { 
            status: req.body.status,
            delivery_number: req.body.delivery_number,
            picking_list: picking_list,
            picking_list_header: picking_list_header,
            picking_list_itemised: picking_list_itemised,
            count_itemised: req.body.count_itemised,
            created_at: new Date()
        },
        { upsert: true });

    if (!delivery) return res.status(404).send('The delivery update failed.');
    
    res.send(delivery);
  });

//GET /api/deliveries/:delivery get a particular delivery

router.get('/:delivery', async (req, res) => {
    const delivery = await Delivery.findOne({delivery_number: req.params.delivery});
    
    if (!delivery) return res.status(404).send('The delivery with the given delivery number was not found.');
    
    res.send(delivery);
  });

//GET /api/deliveries/itemised/:delivery get picking list itemised of a particular delivery

router.get('/itemised/:delivery', async (req, res) => {
    const delivery = await Delivery.findOne({delivery_number: req.params.delivery});
    
    if (!delivery) return res.status(404).send('The delivery with the given delivery number was not found.');
    
    res.send({picking_list_itemised: delivery.picking_list_itemised});
  });
  
//PUT /api/deliveries/issue/:delivery update picked status from control panel

router.put('/issue/:delivery', async (req, res) => {

    const delivery = await Delivery.findOneAndUpdate(
        {   delivery_number: req.params.delivery,
            "picking_list_itemised._id": req.body.item_id
        },
        { 
            $set: { "picking_list_itemised.$.pick_status" : req.body.pick_status, 
                    status: req.body.delivery_status }
        }, { new: true });
    
    if (!delivery) return res.status(404).send('The delivery with the given delivery number was not found.');
      
    res.send({picking_list_itemised: delivery.picking_list_itemised, status: delivery.status});
      
  });

module.exports = router;
