const mongoose = require('mongoose')

const countrySchema = mongoose.Schema(
  {
    title: String,
    code: String,
    countryCode: String,
    countryFlag: String,
    countryPhoneCode: String,
  },
  { versionKey: false }
)

const Country = mongoose.model('Country', countrySchema)

module.exports = Country
