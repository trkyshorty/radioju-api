const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
  {
    email: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  { versionKey: false }
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
