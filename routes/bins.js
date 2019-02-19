
const {Bin} = require('../models/bin'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST /api/bins/bin post a new bin

router.post('/bin', async (req, res) => {
    let bin = new Bin({ 
        bin: req.body.bin,
        sequence: req.body.sequence
      });
      bin = await bin.save();
      res.send(bin);
  });

//GET /api/bins/sequence/:bin get the sequence number for a bin

router.get('/sequence/:bin', async (req, res) => {
    const sequence = await Bin.findOne({bin: req.params.bin});
    res.send(sequence);
  });

module.exports = router;
