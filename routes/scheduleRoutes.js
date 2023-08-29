
// /:user_id
  // Get all tasks associated with the user and assign them with the schedule
    // optional parameter: date, timeframe (from, to)
  // Post new tasks to the schedule

// /:user_id/:id
  // get task by id
  // update task by id
  // delete task by id



const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/scheduleController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 
router.route('/tasks/:user_id')
  .get(scheduleController.getScheduledTasks)
  .post(scheduleController.createNewScheduledTask)

router.route('/tasks/:user_id/:task_id')
  .put(scheduleController.updateScheduledTask)
  .delete(scheduleController.deleteTaskById)


module.exports = router;