const Session = require('../models/Session')
const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;

// @desc get all sessions belonging to a user
// @route GET /sessions
// @access public
const getAllSessions = asyncHandler(async (req, res) => {
  console.log(req.params)
  const sessions = await Session.find({user_id: ObjectId(req.params.userID)}).lean()
  console.log(req.params.userID, sessions)
  if(!sessions || sessions.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No sessions found' })
  res.json(sessions)
})

const getSessionById = asyncHandler(async (req, res) => {
  console.log("UNIQUE")
  console.log(req.params)
  const sessions = await Session.find({_id: ObjectId(req.params.id)}).lean()
  console.log(req.params.id, sessions)
  if(!sessions || sessions.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No sessions found' })
  res.json(sessions)
})

const getActiveSession = asyncHandler(async (req, res) => {
  console.log("Find users active: ", req.params)
  const sessions = await Session.find({$and: [ { user_id: ObjectId(req.params.id) }, { end_time: null }]}).lean()

  if(!sessions || sessions.length <= 0) {
    console.log("No active")
    return res.status(400).json({ message: 'No sessions found' })
  } 
  console.log("success")
  res.json(sessions)
})

// @desc create new session
// @route POST /sessions
// @access public
const createNewSession = asyncHandler(async (req, res) => {

  console.log("Creating new session: ", req.body)
  let start_time = req.body.start_time
  let user_id = req.body.id

  // data confirmation
  if(!start_time) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // create and store new session
  const newSession = await Session.create(req.body)

  if(newSession) {
    console.log("Success")
    res.status(201).json({ message: `New session created` })
  }
  else {
    console.log("nope")
    res.status(400).json({ message: 'Error occured while creating new session.' })
  }
})


// @desc update existing session
// @route patch /sessions
// @access public
const updateSession = asyncHandler(async (req, res) => {
  console.log("Updating: ", req.body)
  const { id, start_time, end_time, topic, desc, location, distracted, social, deep_work, focused } = req.body


  const session = await Session.findById(id).exec()
  console.log("dd")
  if(!session) return res.status(400).json({message: 'Session was not updated' })
  session.start_time = start_time
  session.end_time = end_time
  session.topic = topic
  session.desc = desc
  session.location = location
  session.distracted = distracted
  session.social = social
  session.deep_work = deep_work
  session.focused = focused

  const updatedSession = await session.save()
  console.log("SUCCESS")
  res.json({ message: `Session has been updated.` })
})


// @desc delete existing session
// @route delete /sessions
// @access public
const deleteSession = asyncHandler(async (req, res) => {
  console.log("Delete Session: ", req.body)

  const { id } = req.body

  if(!id)
    return res.status(400).json({ message: 'Session ID is required' })

  const session = await Session.findById(id).exec()

  if(!session) return res.status(400).json({ message: 'User not found' })

  const result = await session.deleteOne()

  const reply = `Session has been deleted.`
  res.json(reply)
})

module.exports = {
  getAllSessions,
  getSessionById,
  getActiveSession,
  createNewSession, 
  updateSession,
  deleteSession
}

