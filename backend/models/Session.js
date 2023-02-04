const { Schema, model } = require("../db/conn");

const SessionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  start_time: { type: Schema.Types.String, required: true },
  end_time: { type: Schema.Types.String, default: null },
  topic: { type: Schema.Types.String, default: "", required: false },
  desc: { type: Schema.Types.String, default: "", required: false },
  location: { type: Schema.Types.String, default: "", required: false },
  distracted: { type: Schema.Types.Boolean, default: false },
  social: { type: Schema.Types.Boolean, default: false },
  deep_work: { type: Schema.Types.Boolean, default: false }, // going in your study session with a purpose and desired outcome
  focused: { type: Schema.Types.Boolean, default: false }
});

const Session = model("Session", SessionSchema);
module.exports = Session;