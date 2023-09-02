const mongoose = require('mongoose')

const scheduleTaskSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task: { type: String, required: true, default: "" },
    scheduled_for: {type: String, required: true, default: new Date()},
    created_on: {type: String, required: true, default: new Date()},
    time_start: {type: String, required: false, default: null},
    time_finish: {type: String, required: false, default: null},
    completed_on: { type: String, required: false},
    completed: { type: Boolean, default: false },
    tags: [], 
    desc: { type: String, default: "" },
    notes: [ String ],
    links: [ String ],
  } 
);

module.exports = mongoose.model('Schedule_Task', scheduleTaskSchema)