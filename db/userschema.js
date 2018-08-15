var mongoose = require('mongoose')
var mongoosedb = require('./connect')

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String
}, {versionKey: false}
)

var users = mongoose.model('users', userSchema)

module.exports = users
