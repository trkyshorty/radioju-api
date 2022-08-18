const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
  {
    title: String,
    countries: [{ type: mongoose.Types.ObjectId, ref: 'Country' }],
  },
  { versionKey: false }
);

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
