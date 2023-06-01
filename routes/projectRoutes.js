const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 

router.route('/:user_id')
  .get(projectController.getAllProjects)
  .post(projectController.createNewProject)

router.route('/project/:id')
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject)

module.exports = router;