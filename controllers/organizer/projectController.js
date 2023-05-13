const Project = require('../../models/organizer/Project')
const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;

// @desc get all active projects belonging to a user, that aren't attached to a project
// @route GET /projects/:id
// @access public
const getAllProjects = asyncHandler(async (req, res) => {
  console.log(req.body, req.params)
  const projects = await Project.find({ user_id: new ObjectId(req.params.userID) }).lean()
  console.log(projects)
  if(!projects || projects.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No projects found' })
  res.json(projects)
})


const getProjectById = asyncHandler(async (req, res) => {
  const projects = await Project.find({ $and: [{_id: new ObjectId(req.params.id)}, {user_id: new ObjectId(req.params.id)}]}).lean()
  if(!projects || projects.length <= 0) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No projects found' })
  res.json(projects)
})


// @desc create new project
// @route POST /projects
// @access public
const createNewProject = asyncHandler(async (req, res) => {
  console.log("Creating project")
  // add required data
  req.body.created_on = new Date().toString() 
  
  // create and store new project
  const newProject = await Project.create(req.body)

  if(newProject) {
    console.log("Success")
    res.status(201).json({ message: `New project created` })
  }
  else {
    console.log("nope")
    res.status(400).json({ message: 'Error occured while creating new project.' })
  }
})


// @desc update existing project
// @route patch /projects
// @access public
const updateProject = asyncHandler(async (req, res) => {
  console.log("Updating: ", req.body)
  const { id, completed_on, finish_by, tags, notes, links, reoccuring, reOccursOn, stage } = req.body


  const project = await Project.findById(id).exec()
  if(!project) return res.status(400).json({message: 'Project was not updated' })
  project.completed_on = completed_on
  project.finish_by = finish_by
  project.tags = tags
  project.notes = notes
  project.links = links
  project.reoccuring = reoccuring
  project.reOccursOn = reOccursOn
  project.stage = stage

  const updatedProject = await project.save()
  console.log("SUCCESS")
  res.json({ message: `Project has been updated.` })
})


// @desc delete existing project
// @route delete /projects
// @access public
const deleteProject = asyncHandler(async (req, res) => {
  console.log("Delete Project: ", req.body)

  const { id } = req.body

  if(!id)
    return res.status(400).json({ message: 'Project ID is required' })

  const project = await Project.findById(id).exec()

  if(!project) return res.status(400).json({ message: 'User not found' })

  const result = await project.deleteOne()

  const reply = `Project has been deleted.`
  res.json(reply)
})

module.exports = {
  getAllProjects,
  getProjectById,
  createNewProject, 
  updateProject,
  deleteProject
}

