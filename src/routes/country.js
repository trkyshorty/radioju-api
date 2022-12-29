const express = require('express')
const countryModel = require('../models/country')

const router = express.Router()

router.get('/', async (req, res) => {
  await countryModel
    .find({})
    .then(async (countries) => {
      res.json(countries)
    })
    .catch((err) => console.info(err))
})

router.get('/:id', async (req, res) => {
  await countryModel
    .findOne({
      _id: req.params.id,
    })
    .then((country) => {
      res.json(country)
    })
    .catch((err) => console.info(err))
})

module.exports = router
