const Task = require('../models/Task')
const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;

// @desc get all active tasks belonging to a user, that aren't attached to a project
// @route GET /tasks/schedule
// @access public
const getAllScheduledTasks = asyncHandler(async (req, res) => {
  console.log("scheduled: ", req.body, req.params)
  const tasks = await Task.find({$and: [ { user_id: new ObjectId(req.params.user_id) }, { goal_id: null}, { project_id: null }]}).lean()

  console.log("found tasks: ", tasks)
  if(!tasks || tasks.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No tasks found' })
  res.json(tasks)
})


// @route GET /tasks/project/:id
const getAllProjectTasks = asyncHandler(async (req, res) => {
  console.log(req.params)
  const tasks = await Task.find({$and: [ { user_id: new ObjectId(req.params.user_id) }, {project_id: new ObjectId(req.params.id)}]}).lean()
  console.log(tasks)
  if(!tasks || tasks.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No tasks found' })
  res.json(tasks)
})

const getTaskById = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ $and: [{_id: new ObjectId(req.params.id)}, {user_id: new ObjectId(req.params.id)}]}).lean()
  if(!tasks || tasks.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No tasks found' })
  res.json(tasks)
})

const getTasksByScheduledFor = asyncHandler(async (req, res) => {
  console.log('ScheduledFor', req.params);
  const tasks = await Task.find({ $and: [{scheduled_for: req.params.date}, {user_id: new ObjectId(req.params.user_id)}]}).lean()
  if(!tasks || tasks.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No tasks found' })
  res.json(tasks)
})

// @desc create new task
// @route POST /tasks
// @access public
const createNewTask = asyncHandler(async (req, res) => {
  console.log("Creating task")

  console.log(req.body, req.params)

  if(req.body.belongsToProject === false) req.body.belongsToProject = null;
  if(req.body.belongsToGoal === false) req.body.belongsToGoal = null;

  // add required data
  req.body.created_on = new Date().toString() 
  // create and store new task
  const newTask = await Task.create(req.body)

  if(newTask) {
    console.log("Success")
    res.status(201).json({ message: `New task created` })
  }
  else {
    console.log("nope")
    res.status(400).json({ message: 'Error occured while creating new task.' })
  }
})

const createNewScheduledTask = asyncHandler(async (req, res) => {
  console.log("Creating schedule task")

  console.log(req.body, req.params)

  // add required data
  req.body.created_on = new Date().toString() 
  
  // create and store new task
  const newTask = await Task.create(req.body)

  if(newTask) {
    console.log("Success")
    res.status(201).json({ message: `New task created` })
  }
  else {
    console.log("nope")
    res.status(400).json({ message: 'Error occured while creating new task.' })
  }
})



// @desc update existing task
// @route patch /tasks
// @access public
const updateTask = asyncHandler(async (req, res) => {
  console.log("Updating: ", req.body, req.params)
  const { user_id, task, id, completed_on, finish_by, tags, notes, links, reoccuring, reOccursOn, stage, values, tag, scheduled_for, timeStart, timeFinish, completed} = req.body

  const updatedTask = await Task.findById(new ObjectId(id)).exec()
  console.log('Found: ', updatedTask)


  if(!updatedTask) return res.status(400).json({message: 'Task was not updated' })
  if(completed_on === null) completed_on = new Date()
  updatedTask.completed_on = completed_on
  updatedTask.finish_by = finish_by || ''
  updatedTask.tags = tags
  updatedTask.values = values
  updatedTask.tag = tag
  updatedTask.notes = notes
  updatedTask.links = links
  updatedTask.scheduled_for = scheduled_for
  updatedTask.reoccuring = reoccuring
  updatedTask.reOccursOn = reOccursOn
  updatedTask.stage = stage
  updatedTask.task = task
  updatedTask.timeStart = timeStart
  updatedTask.timeFinish = timeFinish
  updatedTask.completed = completed

  const savedTask = await updatedTask.save()
  console.log('Saved to: ', updatedTask)
  res.json({ response: {message: `Success.`, updated: updatedTask } })
})


// @desc delete existing task
// @route delete /tasks
// @access public
const deleteTask = asyncHandler(async (req, res) => {
  console.log("Delete Task: ", req.body)

  const { id } = req.body

  if(!id)
    return res.status(400).json({ message: 'Task ID is required' })

  const task = await Task.findById(id).exec()

  if(!task) return res.status(400).json({ message: 'User not found' })

  const result = await task.deleteOne()

  const reply = `Task has been deleted.`.
  res.json(reply)
})

module.exports = {
  getAllScheduledTasks,
  getAllProjectTasks,
  getTaskById,
  getTasksByScheduledFor,
  createNewTask, 
  createNewScheduledTask, 
  updateTask,
  deleteTask
}

