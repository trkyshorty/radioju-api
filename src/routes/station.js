const express = require('express')
const stationModel = require('../models/station')
const countryModel = require('../models/country')

const router = express.Router()

router.get('/', async (req, res) => {
  const { country, sort } = req.query

  let findPattern = {}

  if (country) {
    const findedCountry = await countryModel.find({
      $or: [{ code: country }, { code: 'INT' }],
    })

    if (!findedCountry) {
      return res.status(400).json([])
    }

    findPattern = {
      countries: { $in: findedCountry.map((x) => x._id) },
    }
  }

  const stationList = stationModel.find(findPattern)

  switch (sort) {
    case 'asc':
      stationList.sort({ title: 'asc' })
      break
    case 'desc':
      stationList.sort({ title: 'desc' })
      break
    default:
      break
  }

  stationList
    .populate([
      {
        path: 'genres',
        populate: {
          path: 'countries',
          model: 'Country',
        },
      },
      {
        path: 'countries',
      },
      { path: 'locations' },
      {
        path: 'locations',
        populate: {
          path: 'countries',
          model: 'Country',
        },
      },
    ])
    .then(async (stations) => {
      res.json(stations)
    })
    .catch((err) => console.info(err))
})

router.get('/:id', async (req, res) => {
  await stationModel
    .findOne({
      _id: req.params.id,
    })
    .populate([
      {
        path: 'genres',
        populate: {
          path: 'countries',
          model: 'Country',
        },
      },
      { path: 'countries' },
      { path: 'locations' },
      {
        path: 'locations',
        populate: {
          path: 'countries',
          model: 'Country',
        },
      },
    ])
    .then((station) => {
      res.json(station)
    })
    .catch((err) => console.info(err))
})

module.exports = router
