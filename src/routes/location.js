const express = require('express');
const locationModel = require('../models/location');

const router = express.Router();

router.get('/', async (req, res) => {
  await locationModel
    .find({})
    .populate([{ path: 'countries' }])
    .then(async (locations) => {
      res.json(locations);
    })
    .catch((err) => console.info(err));
});

router.get('/:id', async (req, res) => {
  await locationModel
    .findOne({
      _id: req.params.id,
    })
    .populate([{ path: 'countries' }])
    .then((location) => {
      res.json(location);
    })
    .catch((err) => console.info(err));
});

module.exports = router;
