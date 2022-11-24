const express = require("express");

const userRouter = express.Router()

//Controllers
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller')

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)



module.exports = { userRouter }