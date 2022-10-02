const { Schema, model } = require("../db/conn");

// User Schema
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId , required: true },
    email: { type: String, unique: true, required: false },
    joined_on: { type: Schema.Types.Date, default: Date() },
});

// User model
const User = model("User", UserSchema)
module.exports = User