const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    created_on: { type: Date, required: false, default: new Date()},
    finish_by: { type: Date, required: false, default: new Date()},
    goal: { type: String, required: true },
    color: { type: String, required: false },
    stages: [ String ],
    intention: { type: String, required: false },
    outcome: { type: String, required: false },
    notes: [{ note: String, created_on: Date(), required: false }],
    metric: [{ metric: String, created_on: Date, accomplished_on: Date, required: false }],
  } 
);

module.exports = mongoose.model('Goal', goalSchema)