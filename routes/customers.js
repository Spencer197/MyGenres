const {Customer, validate} = require('../models/customer'); //Sets returned data to .Customer & .validate
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Joi = require('joi'); - No longer needed here, see customer.js

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found.');
    res.send(customer);
  } catch (error) {
    return res.status(400).send('Invalid customer ID.');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isGold: req.body.isGold
  });

  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        isGold: req.body.isGold
      },
      { new: true }
    );

    if (!customer) return res.status(404).send('Customer not found.');

    res.send(customer);
  } catch (error) {
    return res.status(400).send('Invalid customer ID.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('Customer not found.');

    res.send(customer);
  } catch (error) {
    return res.status(400).send('Invalid customer ID.');
  }
});

module.exports = router;
