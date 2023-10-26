   //const Joi = require('joi'); - No longer needed here, see genre.js
   const {Genre, validate} = require('../models/genre');
   const express = require('express');
   const router = express.Router();
   const mongoose = require('mongoose');   

   router.get('/', async (req, res) => {
     const genres = await Genre.find().sort('name');//Find genres by name
     res.send(genres);
   });

   router.post('/', async (req, res) => {
     const { error } = validate(req.body);//shortened from validateGenre
     if (error) return res.status(400).send(error.details[0].message);

     let genre = new Genre({ name: req.body.name });
     genre = await genre.save();//'let' above lets us reset genre
     res.send(genre);
   });

   router.put('/:id', async (req, res) => {
     const { error } = validate(req.body);//shortened from validateGenre
     if (error) return res.status(400).send(error.details[0].message);
     
     const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
     }); 
    
     if (!genre) return res.status(404).send('The genre with the given ID was not found.');

       res.send(genre);
   });

   router.delete('/:id', async (req, res) => {
     try {
       const genre = await Genre.findByIdAndRemove(req.params.id);

       if (!genre) return res.status(404).send('The genre with the given ID was not found.');

       res.send(genre);
     } catch (err) {
       return res.status(500).send('An error occurred while deleting the genre.');
     }
   });

   router.get('/:id', async (req, res) => {
     const genre = await Genre.findById(req.params.id);

     if (!genre) return res.status(404).send('The genre with the given ID was not found.');

     res.send(genre);
   });

   module.exports = router;