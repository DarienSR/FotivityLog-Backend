const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessionControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT) // applies to all routes 

router.route('/:userID')
  .get(sessionsController.getAllSessions)
  .post(sessionsController.createNewSession)
  .put(sessionsController.updateSession)
  .delete(sessionsController.deleteSession)
  
  router.route('/unique/:id')
  .get(sessionsController.getSessionById)
  router.route('/active/:id')
  .get(sessionsController.getActiveSession)



module.exports = router;