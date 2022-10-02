// Connect to our Mongo Database
require("dotenv").config() // load .env variables
const mongoose = require("mongoose") //import fresh mongoose object
//DESTRUCTURE ENV VARIABLES
const DATABASE_URL = process.env.ATLAS_URI;

// CONNECT TO MONGO
mongoose.connect = mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'StudySessionTracker'});

// CONNECTION EVENTS
mongoose.connection
.on("open", () => console.log("DATABASE STATE", "Connection Open"))
.on("close", () => console.log("DATABASE STATE", "Connection Open"))
.on("error", (error) => console.log("DATABASE STATE", error))

// EXPORT CONNECTION
module.exports = mongoose