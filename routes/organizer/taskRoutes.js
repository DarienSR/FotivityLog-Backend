const express = require('express')
const router = express.Router()
const tasksController = require('../../controllers/organizer/taskController')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 

router.route('/:userID/schedule/')
  .get(tasksController.getAllScheduledTasks)
  
router.route('/:userID/project/:id')
  .get(tasksController.getAllProjectTasks)



router.route('/:userID')
  .get(tasksController.getTaskById)
  .post(tasksController.createNewTask)
  .put(tasksController.updateTask)
  .delete(tasksController.deleteTask)

module.exports = router;