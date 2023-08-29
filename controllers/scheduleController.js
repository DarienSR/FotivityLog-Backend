// router.route('/:user_id')
//   .get(scheduleController.getScheduledTasks)
//   .post(scheduleController.createNewScheduledTask)

// router.route('/:user_id/:task_id')
//   .get(scheduleController.getTaskById)
//   .put(scheduleController.updateTaskById)
//   .delete(scheduleController.deleteTaskById)

const ScheduleTask = require('../models/ScheduleTask');
const asyncHandler = require('express-async-handler');
var ObjectId = require('mongodb').ObjectId;
var sanitize = require('mongo-sanitize');

const getScheduledTasks = asyncHandler(async (req, res) => {
  console.log('Route: Get Scheduled Tasks', req.query)
  const query = [ { user_id: new ObjectId(req.params.user_id) } ];

  // CHECK FOR FILITERING
  (req.query.scheduled_for) ? query.push({ scheduled_for: req.query.scheduled_for }) : ''; // filter by scheduled_for date
  
  (req.query.to && req.query.from) ? query.push({ scheduled_for: { "$gte": req.query.from, "$lt": req.query.to } }) : ''; // filter by timeframe (from, to)
  
  (req.query._id) ? query.push({ _id: new ObjectId(req.query._id) }) : ''; // filter by id
  
  console.log('Query: ', query);

  const queryData = await ScheduleTask.find({$and: query }).lean()

  console.log(queryData)

  if(!queryData || queryData.length <= 0)
    return res.status(204).json({ message: 'No tasks found' });

  res.json(queryData);
});


const createNewScheduledTask = asyncHandler(async(req, res) => {
  console.log('Creating a task for schedule', req.body);


  // Add Required Data that is not handled in frontend

  const newTask = await ScheduleTask.create(req.body)
  if(newTask) {
    res.json(newTask)
  }
  res.status(400).json({ message: 'Error occured while creating new task.' })
})

const updateScheduledTask = asyncHandler(async(req, res) => {
  console.log('Updating Scheduled Task', req.body)

  const taskToUpdate = await ScheduleTask.findById(new ObjectId(sanitize(req.body._id))).exec();

  // deconstruct 
  const { task, scheduled_for, time_start, time_finish, completed_on, finish_by, tags, desc, notes, links, completed} = req.body

  // validation
  if(task.length <= 0) return res.status(400).json({ message: 'Error on task field.' })  


  // update task to new values
  taskToUpdate.task = sanitize(task) || '';
  taskToUpdate.scheduled_for = sanitize(scheduled_for) || new Date();
  taskToUpdate.time_start = sanitize(time_start) || null;
  taskToUpdate.time_finish = sanitize(time_finish) || null;
  taskToUpdate.completed_on = sanitize(completed_on) || null;
  taskToUpdate.finish_by = sanitize(finish_by) || null;
  taskToUpdate.tags = sanitize(tags) || [];
  taskToUpdate.desc = sanitize(desc) || '';
  taskToUpdate.notes = sanitize(notes) || [];
  taskToUpdate.links = sanitize(links) || [];
  taskToUpdate.completed = sanitize(completed) || false;
  // save task
  const savedTask = await taskToUpdate.save();
  // log response, give back updated task
  if(savedTask) 
    return res.json( { taskToUpdate  })
  return res.status(400).json({ message: 'Cannot save task.' })

})

const deleteTaskById = asyncHandler(async (req, res) => {
  console.log("Delete Task: ", req.body)

  const { id } = req.body

  if(!id)
    return res.status(400).json({ message: 'Task ID is required' })

  const task = await ScheduleTask.findById(id).exec()

  if(!task) return res.status(400).json({ message: 'User not found' })

  const result = await ScheduleTask.deleteOne()

  res.json(result)
})

module.exports = {
  getScheduledTasks,
  createNewScheduledTask,
  updateScheduledTask,
  deleteTaskById
}