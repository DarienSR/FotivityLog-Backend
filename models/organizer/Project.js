const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    created_on: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: false },
    stages: [ String ]
  } 
);

module.exports = mongoose.model('Project', projectSchema)