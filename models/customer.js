const Joi = require('joi');
const mongoose = require('mongoose');

// Create a Mongoose model/schema for customers
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10
    },
    isGold: {
      type: Boolean,
      default: false
    }
  }));

  function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      phoneNumber: Joi.string().min(10).required(),
      isGold: Joi.boolean()
    });
  
    return schema.validate(customer);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer;