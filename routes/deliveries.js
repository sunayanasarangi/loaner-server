
const {Delivery} = require('../models/delivery'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/deliveries/delivery post a new delivery

router.post('/delivery', async (req, res) => {
    let result = [];
    for (var i in req.body.materials)
        result.push(req.body.materials[i]);
    let delivery = new Delivery({ 
        delivery_number: req.body.delivery_number,
        materials: result
      });

      delivery = await delivery.save();
      
      res.send(delivery);
  });

//GET /api/deliveries/deliveries get all deliveries

router.get('/deliveries', async (req, res) => {
    const deliveries = await Delivery.find({});
    res.send(deliveries);
  });

module.exports = router;
