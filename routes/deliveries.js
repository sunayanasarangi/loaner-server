
const {Delivery} = require('../models/delivery'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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
            delivery_number: req.body.delivery_number,
            materials: materials,
            picking_list: picking_list
        },
        { upsert: true });
    
      res.send(delivery);
  });

//GET /api/deliveries get all deliveries

router.get('/', async (req, res) => {
    const deliveries = await Delivery.find({});
    res.send(deliveries);
  });

module.exports = router;
