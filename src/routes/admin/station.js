const express = require('express');
const path = require('path');
const Jimp = require('jimp');
const stationModel = require('../../models/station');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { url, img } = req.body;

    const oldStation = await stationModel.findOne({ url });

    if (oldStation) {
      return res.status(400).json({ error: { text: 'Station already exist' } });
    }

    await stationModel.create(req.body).then((station) => {
      Jimp.read(img)
        .then((imageData) => {
          imageData.write(path.resolve(`./storage/image/station/${station._id}.png`));
          res.json({ message: 'Station added!' });
        })
        .catch((err) => {
          console.error(err);
          return res.status(400).json({ error: { text: 'Station added but image not uploaded check server logs' } });
        });
    });
  } catch (err) {
    console.error(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { img } = req.body;
    await stationModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false })
      .then((station) => {
        Jimp.read(img)
          .then((imageData) => {
            imageData.write(path.resolve(`./storage/image/station/${station._id}.png`));
            res.json({ message: 'Station updated!' });
          })
          .catch((err) => {
            console.error(err);
            return res
              .status(400)
              .json({ error: { text: 'Station updated but image not uploaded check server logs' } });
          });
      });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
