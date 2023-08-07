const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task: { type: String, required: true, default: "" },
    created_on: { type: String, required: true, default: new Date()},
    scheduled_for: {type: String, required: false, default: new Date()},
    timeStart: {type: String, required: false, default: null},
    timeFinish: {type: String, required: false, default: null},
    completed: { type: Boolean, required: true, default: false },
    completed_on: { type: String, required: false },
    finish_by: { type: String, default: "", required: false }, // date assigned
    value: { type: Number, default: 0 },
    tags: [], 
    desc: { type: String, default: "" },
    notes: [ String ],
    links: [ String ],
    // either project_id or goal_id or both are null. If both are null then task belongs to schedule
    project_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Project', default: null },
    goal_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Project', default: null },
    stage: { type: Number, required: true, default: 0 }, // used for goal, schedule, and project
    reoccursOn: [ String ],
  } 
);

module.exports = mongoose.model('Task', taskSchema)