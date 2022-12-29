const express = require('express');
const countryModel = require('../../models/country');
const genreModel = require('../../models/genre');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    const oldCountry = await countryModel.findOne({ title });

    if (oldCountry) {
      return res.status(400).json({ error: { text: 'Country already exist' } });
    }

    await countryModel.create(req.body).then(async (addedCountry) => {
      res.json({ message: 'Country added!' });

      // Country add to all genres
      await genreModel
        .find({})
        .populate([{ path: 'countries' }])
        .then(async (genres) => {
          genres.forEach((x) => {
            x.countries.push(addedCountry);
            x.save();
          });
        });
    });
  } catch (err) {
    console.error(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { title, code } = req.body;
    await countryModel.findOneAndUpdate({ _id: req.params.id }, { title, code }, { upsert: false }).then(() => {
      res.json({ message: 'Country updated!' });
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
