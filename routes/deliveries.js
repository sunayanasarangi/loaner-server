
const {Delivery} = require('../models/delivery'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/deliveries/delivery post a new delivery if delivery not found, else update the delivery

router.post('/delivery', async (req, res) => {
    let materials = [];
    for (var i in req.body.materials)
        materials.push(req.body.materials[i]);

    const delivery = await Delivery.update(
        { delivery_number: req.body.delivery_number },
        { 
            delivery_number: req.body.delivery_number,
            materials: materials
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
