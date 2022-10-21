const express = require('express');
const mongoose = require('./database/mongoose');
const Policy = require('./database/models/policyModel');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

/*** GET All ***/
app.get('/insurancepolicy', (req, res) => {
  Policy.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500);
    })
});

/*** GET One ***/
app.get('/insurancepolicy/:policyNumber', (req, res) => {
  const policyNumber = req.params.policyNumber;

  Policy.findOne({ _id: policyNumber })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500);
    })
});

/*** CREATE ***/
app.post('/insurancepolicy', (req, res) => {
  const policyObj = req.body;

  console.log('22', req.body);

  Policy(policyObj).save()
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500)
    })
});

/*** UPDATE ***/
app.put('/insurancepolicy/:policyNumber', (req, res) => {
  const policyNumber = req.params.policyNumber;

  Policy.findOneAndUpdate(
    { _id: policyNumber },
    { $set: req.body },
    { new: true }
  )
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500)
    })
});

/*** DELETE ***/
app.delete('/insurancepolicy/:policyNumber', (req, res) => {
  const policyNumber = req.params.policyNumber;

  Policy.findOneAndDelete({ _id: policyNumber })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500);
    });
});

app.listen('3010', () => {
  console.log('running on port: 3010');
});