const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersControllers')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT) // applies to all routes 

router.route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;