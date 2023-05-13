const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  joined_on: { type: String, require: true, default: Date() },
  last_active: { type: String, require: false },
  paid: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema)