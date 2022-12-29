const express = require('express')
const genreModel = require('../models/genre')

const router = express.Router()

router.get('/', async (req, res) => {
  await genreModel
    .find({})
    .populate([{ path: 'countries' }])
    .then(async (genres) => {
      res.json(genres)
    })
    .catch((err) => console.info(err))
})

router.get('/:id', async (req, res) => {
  await genreModel
    .findOne({
      _id: req.params.id,
    })
    .populate([{ path: 'countries' }])
    .then((genre) => {
      res.json(genre)
    })
    .catch((err) => console.info(err))
})

module.exports = router
