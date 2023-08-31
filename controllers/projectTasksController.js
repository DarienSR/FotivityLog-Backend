const ProjectTask = require('../models/ProjectTask');
const asyncHandler = require('express-async-handler');
var ObjectId = require('mongodb').ObjectId;
var sanitize = require('mongo-sanitize');

const getProjectTasks = asyncHandler(async (req, res) => {

  const query = [ { user_id: new ObjectId(req.params.user_id) }, { project_id: new ObjectId(req.params.project_id) } ];

  (req.query._id) ? query.push({ _id: new ObjectId(req.query._id) }) : ''; // filter task by id
  
  console.log('Query: ', query);

  const queryData = await ProjectTask.find({$and: query }).lean()

  console.log('returned data', queryData)

  if(!queryData || queryData.length <= 0)
    return res.status(204).json({ message: 'No tasks found' });

  res.json(queryData);
});


const createNewProjectTask = asyncHandler(async(req, res) => {
  console.log('Creating a task for project', req.body);


  // Add Required Data that is not handled in frontend

  const newTask = await ProjectTask.create(req.body)
  if(newTask) {
    res.json(newTask)
  }
  res.status(400).json({ message: 'Error occured while creating new task.' })
})

const updateProjectTask = asyncHandler(async(req, res) => {
  console.log('Updating Project Task', req.body)

  const taskToUpdate = await ProjectTask.findById(new ObjectId(sanitize(req.body._id))).exec();

  // deconstruct 
  const { task, desc, value, tags, notes, links, stage} = req.body

  // validation
  if(task.length <= 0) return res.status(400).json({ message: 'Error on task field.' })  


  // update task to new values
  taskToUpdate.task = sanitize(task) || '';
  taskToUpdate.tags = sanitize(tags) || [];
  taskToUpdate.desc = sanitize(desc) || '';
  taskToUpdate.notes = sanitize(notes) || [];
  taskToUpdate.links = sanitize(links) || [];
  taskToUpdate.value = sanitize(value) || 0;
  taskToUpdate.stage = sanitize(stage) || '';
  // save task
  const savedTask = await taskToUpdate.save();
  // log response, give back updated task
  if(savedTask) 
    return res.json( { taskToUpdate  })
  return res.status(400).json({ message: 'Cannot save task.' })

})

const deleteProjectTask = asyncHandler(async (req, res) => {
  console.log("Delete Task: ", req.body)

  const { _id } = req.body

  if(!_id)
    return res.status(400).json({ message: 'Task ID is required' })

  const task = await ProjectTask.findById(_id).exec()

  if(!task) return res.status(400).json({ message: 'User not found' })

  const result = await ProjectTask.deleteOne()

  res.json(result)
})

module.exports = {
  getProjectTasks,
  createNewProjectTask,
  updateProjectTask,
  deleteProjectTask
}