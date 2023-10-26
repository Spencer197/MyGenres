const Joi = require('joi');
const mongoose = require('mongoose');

// Create a Mongoose model/schema for genres
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 15
    },
  }));

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required(),
    };

    return Joi.validate(genre, schema);
  }

  exports.Genre = Genre;
  exports.validate = validateGenre;