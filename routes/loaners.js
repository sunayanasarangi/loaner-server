
const {Loaner} = require('../models/loaner'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/microphones post a new microphone

router.post('/loaner', async (req, res) => {

    let loaner = new Loaner({ 
        sku: req.body.sku,
        serial_number: req.body.serial_number,
        status: req.body.status
      });

      loaner = await loaner.save();
      
      res.send(loaner);
  });

//PUT /api/microphones update a microphone

router.put('/loaner/:serial_number', async (req, res) => {

    const loaner = await Loaner.findOneAndUpdate(req.params.serial_number,
        { 
            serial_number: req.body.serial_number,
            sku: req.body.sku,
            status: req.body.status
        }, { new: true });
    
        if (!microphone) return res.status(404).send('The loaner with the given serial numer was not found.');
      
      res.send(microphone);
  });

module.exports = router;
