const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

//Routes
const { userRouter } = require('./routes/user.route')



app.use('/user', userRouter)


module.exports = {app}