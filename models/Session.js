const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    start_time: { type: String, required: true },
    end_time: { type: String, default: null },
    topic: { type: String, default: "", required: false },
    desc: { type: String, default: "", required: false },
    location: { type: String, default: "", required: false },
    distracted: { type: Boolean, default: false },
    social: { type: Boolean, default: false },
    deep_work: { type: Boolean, default: false }, // going in your study session with a purpose and desired outcome
    focused: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Session', sessionSchema)