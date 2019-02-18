
const {Loaner} = require('../models/loaner'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/microphones post a new microphone

router.post('/loaner', async (req, res) => {

    let loaner = new Loaner({ 
        rfid: req.body.rfid,
        sku: req.body.sku,
        description: req.body.description,
        serial_number: req.body.serial_number,
        status: req.body.status,
        bin: req.body.bin
      });

      loaner = await loaner.save();
      
      res.send(loaner);
  });

//PUT /api/microphones update a microphone

router.put('/loaner/:sku', async (req, res) => {

    const loaner = await Loaner.findOneAndUpdate(req.params.sku,
        { 
            sku: req.body.sku,
            serial_number: req.body.serial_number,
            status: req.body.status
        }, { new: true });
    
        if (!loaner) return res.status(404).send('The loaner with the given serial numer was not found.');
      
      res.send(loaner);
  });

//GET /api/loaner/bins/:material get all bins that contain a material

router.get('/loaner/bins/:sku', async (req, res, next) => {
    //const bins = await Bin.match({sku: req.params.sku});
    const bins = await Bin.aggregate([
                            { $match: { sku: req.params.sku } }, 
                            { $group: { _id: "$bin", count: { $sum: 1 } } }
                        ])
    res.send(bins);
  });


module.exports = router;
