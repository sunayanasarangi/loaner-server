
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
    let materials = [];
    let picking_list = [];
    for (var i in req.body.materials)
        materials.push(req.body.materials[i]);
    for (var j in req.body.picking_list)
        picking_list.push(req.body.picking_list[j]);

    const delivery = await Delivery.update(
        { delivery_number: req.body.delivery_number },
        { 
            status: req.body.status,
            delivery_number: req.body.delivery_number,
            materials: materials,
            picking_list: picking_list,
            created_at: new Date()
        },
        { upsert: true });
    
      res.send(delivery);
  });

//GET /api/deliveries/:delivery get a particular delivery

router.get('/:delivery', async (req, res) => {
    const delivery = await Delivery.findOne({delivery_number: req.params.delivery});
    
    if (!delivery) return res.status(404).send('The delivery with the given delivery number was not found.');
    
    res.send(delivery);
  });
  

module.exports = router;
