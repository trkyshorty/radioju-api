const mongoose = require('mongoose')

const stationSchema = mongoose.Schema(
  {
    title: String,
    url: String,
    genres: [{ type: mongoose.Types.ObjectId, ref: 'Genre' }],
    countries: [{ type: mongoose.Types.ObjectId, ref: 'Country' }],
    locations: [{ type: mongoose.Types.ObjectId, ref: 'Location' }],
  },
  { versionKey: false }
)

const Station = mongoose.model('Station', stationSchema)

module.exports = Station
