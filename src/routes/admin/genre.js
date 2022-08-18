const express = require('express');
const genreModel = require('../../models/genre');

const router = express.Router();

router.post('/', async (req, res) => {
  await genreModel
    .exists({ title: req.body.title })
    .then(async (genre) => {
      if (!genre) {
        await genreModel
          .create(req.body)
          .then(() => {
            res.json({ message: 'Genre added!' });
          })
          .catch((err) => console.info(err));
      } else {
        res.json({ message: 'Genre already exist' });
      }
    })
    .catch((err) => console.info(err));
});

router.patch('/:id', async (req, res) => {
  await genreModel
    .findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false })
    .then(() => {
      res.json({ message: 'Genre updated!' });
    })
    .catch((err) => console.info(err));
});

module.exports = router;
