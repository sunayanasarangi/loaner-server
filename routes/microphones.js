
const {Microphone} = require('../models/microphone'); 

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET /api/microphones get all microphones

router.get('/microphones', async (req, res) => {
    const microphones = await Microphone.find();
    res.send(microphones);
  });


//POST /api/microphones post a new microphone

router.post('/microphones', async (req, res) => {

    let microphone = new Microphone({ 
        prod_id: req.body.prod_id,
        title: req.body.title,
        product_series: req.body.product_series,
        form_factor: req.body.form_factor,
        life_cycle_status: req.body.life_cycle_status,
        frequency_style: req.body.frequency_style,
        polar_patterns: req.body.polar_patterns,
        transducer_type: req.body.transducer_type,
        connectors: req.body.connectors,
        available_wireless: req.body.available_wireless,
        image: req.body.image,
        tobe_discontinued: req.body.tobe_discontinued,
        sound_source: req.body.sound_source,
        environments: req.body.environments,
        industry: req.body.industry
      });

      microphone = await microphone.save();
      
      res.send(microphone);
  });

//PUT /api/microphones update a microphone

router.put('/microphones/:prod_id', async (req, res) => {

    //const microphone = await Microphone.findByIdAndUpdate(req.params.id,
    const microphone = await Microphone.findOneAndUpdate(req.params.prod_id,
        { 
            prod_id: req.body.prod_id,
            title: req.body.title,
            product_series: req.body.product_series,
            form_factor: req.body.form_factor,
            life_cycle_status: req.body.life_cycle_status,
            frequency_style: req.body.frequency_style,
            polar_patterns: req.body.polar_patterns,
            transducer_type: req.body.transducer_type,
            connectors: req.body.connectors,
            available_wireless: req.body.available_wireless,
            image: req.body.image,
            tobe_discontinued: req.body.tobe_discontinued,
            sound_source: req.body.sound_source,
            environments: req.body.environments,
            industry: req.body.industry
        }, { new: true });
    
        if (!microphone) return res.status(404).send('The microphone with the given ID was not found.');
      
      res.send(microphone);
  });

  //GET /api/microphones/:prod_id get specific microphone

router.get('/microphones/:prodid', async (req, res) => {
    const microphone = await Microphone.findOne({prod_id: req.params.prodid});
    if (!microphone) return res.status(404).send('The microphone with the given ID was not found.');
    res.send(microphone);
  });



  

//GET /api/microphones/_filter get microphones satisfying the filter query params

router.get('/microphones/_filter', async (req, res) => {
    var filterQuery = new Array();
    for (var propName in req.query) {
        if (req.query.hasOwnProperty(propName)) {
            filterQuery.push(req.query);
        }
    }
    const microphones = await Microphone.find().and(filterQuery);      
    res.send(microphones);
  })



module.exports = router;
