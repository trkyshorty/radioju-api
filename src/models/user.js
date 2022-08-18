const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
