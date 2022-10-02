const mongoose = require("mongoose") //import fresh mongoose object
require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const router = Router();
var ObjectId = require('mongodb').ObjectId;

// Model definition
const Session = require("../models/Session");

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

module.exports = router;