const express = require('express')
const router = express.Router()
const projectController = require('../../controllers/organizer/projectController')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 


  
router.route('/:userID')
  .get(projectController.getAllProjects)
  .post(projectController.createNewProject)



router.route('/:userID/projects/:id')
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject)

module.exports = router;