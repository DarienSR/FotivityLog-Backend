const mongoose = require("mongoose") //import fresh mongoose object
require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const router = Router();
var ObjectId = require('mongodb').ObjectId;

// Model definition
const Session = require("../models/Session");


// get all sessions
router.get("/all/:user_id", async (req, res) => {
  const { db } = mongoose.connection;
   db.collection("sessions")
  .find({user_id: ObjectId(req.params.user_id)})
  .toArray(function (err, result) {
      if (err) throw err;

      res.json(result);
  });
});

// Get current session and display. Search sessions and pull out the session that has end_time = null.
// This should only return one session. 
router.get("/current/:user_id", async (req, res) => {
  const { db } = mongoose.connection;
   db.collection("sessions")
  .find({$and: [{end_time: null}, {user_id: ObjectId(req.params.user_id)}]})
  .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
  });
});

router.post("/start", async (req, res) => {
  try {
    req.body._id = new ObjectId(); // session id

    console.log("SESSION START: ", req.body)
    const session = await Session.create(req.body); // create object in the database
    res.json(session);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
});

// update route for current session finish. 
router.put('/finish', function(req, res) {
  try {
    const { db } = mongoose.connection;
    // push actual lift into your session
    console.log("Values: ", req.body)
    let update = db.collection('sessions').updateOne(
      {$and: [{end_time: null}, {user_id: ObjectId(req.body.user_id)}]}, // select the session that does not have an end_time, should only be one
      { $set: { 
        end_time: req.body.endTime,
        topic: req.body.topic,
        desc: req.body.desc,
        location: req.body.location,
        distracted: req.body.distracted,
        social: req.body.social,
        deep_work: req.body.deep_work,
      } }
    )
    console.log(update)
    res.json(update)
  } catch(error) {
    console.log("Error: ------\n", error)
    res.status(400).json({ error });
  }
});

// update route existing session. 
router.put('/update/:id', function(req, res) {
  try {
    const { db } = mongoose.connection;
    console.log(req.params.id, req.body)
    // push actual lift into your session
    let update = db.collection('sessions').updateOne(
      {$and: [{_id: ObjectId(req.params.id)}, {user_id: ObjectId(req.body.user_id)}]},
      { $set: { 
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        topic: req.body.topic,
        desc: req.body.desc,
        location: req.body.location,
        distracted: req.body.distracted,
        social: req.body.social,
        deep_work: req.body.deep_work
      } }
    )
    console.log(update)

    res.json(update)
  } catch(error) {
    console.log("Error: ------\n", error)
    res.status(400).json({ error });
  }
});

// delete session
router.delete("/delete/:id", function(req, res) {
  const { db } = mongoose.connection;
  db.collection('sessions').deleteOne({ _id: ObjectId(req.params.id)}, function (err, result) {
    res.send(result);
  });
})

module.exports = router;