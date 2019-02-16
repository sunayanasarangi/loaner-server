
const {Delivery} = require('../models/delivery'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/microphones post a new microphone

router.post('/delivery', async (req, res) => {

    let delivery = new Delivery({ 
        delivery_number: req.body.delivery_number,
        materials: req.body.materials,
      });

      delivery = await delivery.save();
      
      res.send(delivery);
  });

module.exports = router;
