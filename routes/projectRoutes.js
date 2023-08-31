const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const projectTasksController = require('../controllers/projectTasksController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 

// /user_id?id= project get project filter by all and id, post, update, delete

// get tasks belonging to a project
// /user_id/project_id/tasks?id=


router.route('/:user_id')
  .get(projectController.getProjects)
  .post(projectController.createNewProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject)

router.route('/:user_id/:project_id/tasks')
  .get(projectTasksController.getProjectTasks)
  .post(projectTasksController.createNewProjectTask)
  .put(projectTasksController.updateProjectTask)
  .delete(projectTasksController.deleteProjectTask)

module.exports = router;