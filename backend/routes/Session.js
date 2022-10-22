const mongoose = require("mongoose") //import fresh mongoose object
require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const router = Router();
var ObjectId = require('mongodb').ObjectId;

// Model definition
const Session = require("../models/Session");


// get all sessions
router.get("/all", async (req, res) => {
  const { db } = mongoose.connection;
   db.collection("sessions")
  .find()
  .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
  });
});

// Get current session and display. Search sessions and pull out the session that has end_time = null.
// This should only return one session. 
router.get("/current", async (req, res) => {
  const { db } = mongoose.connection;
   db.collection("sessions")
  .find({ end_time: null })
  .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
  });
});

router.post("/start", async (req, res) => {
  try {
    req.body._id = new ObjectId();
    req.body.user_id = ObjectId(req.body.user_id)
    console.log(req.body)
    const session = await Session.create(req.body); // create object in the database
    res.json(session);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
});

// update route for session finish. 
router.put('/finish', function(req, res) {
  try {
    const { db } = mongoose.connection;
    // push actual lift into your session
    let update = db.collection('sessions').updateOne(
      { end_time: null}, // select the session that does not have an end_time, should only be one
      { $set: { 
        end_time: new Date(),
        topic: req.body.topic,
        desc: req.body.desc,
        location: req.body.location,
        distracted: req.body.distracted,
        social: req.body.social
      } }
    )
    console.log(update)

    res.json(update)
  } catch(error) {
    console.log("Error: ------\n", error)
    res.status(400).json({ error });
  }
});
module.exports = router;