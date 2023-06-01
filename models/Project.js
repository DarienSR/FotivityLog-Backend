const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    created_on: { type: String, required: false, default: new Date()},
    name: { type: String, required: true },
    tags: [], 
    stages: [ String ]
  } 
);

module.exports = mongoose.model('Project', projectSchema)