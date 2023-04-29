const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task: { type: String, required: true },
    created_on: { type: String, required: true },
    completed_on: { type: String, default: null, required: false },
    finish_by: { type: String, default: "", required: false },
    tags: [ String ],
    notes: [ String ],
    links: [ String ],
    reoccuring: { type: Boolean, default: false},
    reOccursOn: [ String ],
    // THESE ARE GENERALLY USED FOR PROJECT 
    project_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Project' },
    stage: { type: String, required: false },
    belongsToProject: { type: Boolean, default: false},
  } 
);

module.exports = mongoose.model('Task', taskSchema)