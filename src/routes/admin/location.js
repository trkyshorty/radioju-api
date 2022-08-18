const express = require('express');
const locationModel = require('../../models/location');

const router = express.Router();

router.post('/', async (req, res) => {
  await locationModel
    .exists({ title: req.body.title })
    .then(async (location) => {
      if (!location) {
        await locationModel
          .create(req.body)
          .then(() => {
            res.json({ message: 'Location added!' });
          })
          .catch((err) => console.info(err));
      } else {
        res.json({ message: 'Location already exist' });
      }
    })
    .catch((err) => console.info(err));
});

router.patch('/:id', async (req, res) => {
  await locationModel
    .findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false })
    .then(() => {
      res.json({ message: 'Location updated!' });
    })
    .catch((err) => console.info(err));
});

module.exports = router;
