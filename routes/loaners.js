
const {Loaner} = require('../models/loaner'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET /api/loaners get all deliveries

router.get('/', async (req, res) => {
    const loaners = await Loaner.find({});
    res.send(loaners);
  });

//POST /api/loaners/loaner post a new loaner if loaner does not exist, else update it

router.post('/loaner', async (req, res) => {

    const loaner = await Loaner.update(
        { rfid: req.body.rfid },
        { 
            rfid: req.body.rfid,
            sku: req.body.sku,
            description: req.body.description,
            serial_number: req.body.serial_number,
            status: req.body.status,
            bin: req.body.bin
        },
        { upsert: true });
    
      res.send(loaner);

  });

//PUT /api/loaners/loaner/:sku update a loaner
//this has to be updated later
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

//GET /api/loaners/bins/:material get all bins that contain a material

router.get('/bins/:sku/:serial_number', async (req, res, next) => {
    //const bins = await Bin.match({sku: req.params.sku});
    const bins = await Loaner.aggregate([
                            { $match: {
                                $and: [{ sku: req.params.sku }, { serial_number: req.params.serial_number }]  }
                            }, 
                            { $group: { _id: "$bin",  count: { $sum: 1 } } }
                        ])
    res.send(bins);
  });


module.exports = router;
