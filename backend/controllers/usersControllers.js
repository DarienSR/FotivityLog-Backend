const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access Private, admin role
const getAllUsers = asyncHandler(async (req, res) => {
  // do not return the password back to the client
  const users = await User.find().select('-password').lean()
  if(!users?.length) // optional chaning. Check to see if users exists, if true check length 
    return res.status(400).json({ message: 'No users found' })
  res.json(users)
})

// @desc create new users
// @route POST /users
// @access public
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, email} = req.body

  // data confirmation
  if(!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // check for duplicates
  const duplicateEmail = await User.findOne({ email }).lean().exec()
  if(duplicateEmail) return res.status(409).json({ message: 'An account is already associated with that email.' })

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const userObject = { username, password: hashedPassword, email}

  // create and store new user
  const user = await User.create(userObject)

  if(user)
    res.status(201).json({ message: `New user ${username} created` })
  else 
    res.status(400).json({ message: 'Error occured while creating new user.' })
})


// @desc update existing users
// @route patch /users
// @access public
const updateUser = asyncHandler(async (req, res) => {
  const { oldUsername, oldEmail, oldPassword, newPassword, id } = req.body
  console.log(req.body, oldUsername)
  // confirm data
  if(!id || !oldUsername || !oldEmail)
    return res.status(400).json({message: 'All fields are required.' })

    
    const user = await User.findById(id).exec()
    if(!user) return res.status(400).json({message: 'User not found' })
    
    // compare passwords

    const match = await bcrypt.compare(oldPassword, user.password)
    if(!match) return res.status(400).json({message: 'Incorrect password' })

  
  const duplicate = await User.findOne({oldEmail}).lean().exec()
  // only update original user
  if(duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: 'Email is already in use' })

  user.username = oldUsername
  user.email = oldEmail

  if(newPassword) {
    user.password = await bcrypt.hash(newPassword, 10)
  }

  const updatedUser = await user.save()

  res.json({ message: `${ updatedUser.username } your account details have been updated.` })
})


// @desc delete existing user
// @route delete /users
// @access public
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if(!id)
    return res.status(400).json({ message: 'User ID is required' })

  const user = await User.findById(id).exec()

  if(!user) return res.status(400).json({ message: 'User not found' })

  const result = await user.deleteOne()

  const reply = `Username ${ result.username } has been deleted.`
  res.json(reply)
})

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}

