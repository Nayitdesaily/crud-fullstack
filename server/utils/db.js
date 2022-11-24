const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost:27017/user-crud')

module.exports = { db }