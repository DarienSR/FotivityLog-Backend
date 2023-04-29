const mongoose = require('mongoose')

const streakSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    created_on: { type: String, required: true },
    streakName: { type: String, required: true },
    currentCount: { type: Number, required: true, default: 0 },
    highestCount: { type: Number, required: true, default: 0 },
    reOccursOn: [ String ]
  } 
);

module.exports = mongoose.model('Streak', streakSchema)