const mongoose = require('mongoose')

const projectTaskSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task: { type: String, required: true, default: "" },
    desc: { type: String, default: "" },
    created_on: { type: String, required: true, default: new Date()},
    value: { type: Number, default: 0 },
    tags: [], 
    notes: [ String ],
    links: [ String ],
    project_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Project', default: null },
    stage: { type: Number, required: true, default: 0 }, // used for goal, schedule, and project
  } 
);

module.exports = mongoose.model('ProjectTask', projectTaskSchema)