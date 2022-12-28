const mongoose = require('mongoose')

const locationSchema = mongoose.Schema(
  {
    title: String,
    countries: [{ type: mongoose.Types.ObjectId, ref: 'Country' }],
  },
  { versionKey: false }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
