
const {Loaner} = require('../models/loaner'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET /api/loaners get all materials

router.get('/', async (req, res) => {
    const loaners = await Loaner.find({});
    res.send(loaners);
  });

//GET /api/loaners/:loaner get a particular material

router.get('/:loaner', async (req, res) => {
    const loaner = await Loaner.findOne({sku: req.params.loaner});
    
    if (!loaner) return res.status(404).send('The material was not found.');
    
    res.send(loaner);
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

//PUT /api/loaners/loaner/:rfid update a loaner from control panel

router.put('/loaner/:rfid', async (req, res) => {

    const loaner = await Loaner.findOneAndUpdate({rfid: req.params.rfid},
        { 
            bin: req.body.bin
        }, { new: true });
    
        if (!loaner) return res.status(404).send('The loaner with the given serial numer was not found.');
      
      res.send(loaner);
  });

//GET /api/loaners/bins/:material get all bins that contain a material

router.get('/bins/:sku', async (req, res, next) => {
    //const bins = await Bin.match({sku: req.params.sku});
    const bins = await Loaner.aggregate([
                            { $match: { sku: req.params.sku } }, 
                            { $group: { _id: "$bin",  count: { $sum: 1 } } }
                        ])
    res.send(bins);
  });


module.exports = router;
