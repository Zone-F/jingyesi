/**
 * Created by Administrator on 4/8/2018.
 */
var mongoose = require('mongoose')
var mongoosedb = require('./connect')

var activityschema = new mongoose.Schema({
  user: String, // 发起人
  users: Array, // 参与用户列表
  book: Array, // 书单列表
  rebook: Array, // 备选书单列表
  begdate: String, // 开始时间
  enddate: String, // 结束时间
  userinfo: [{user: String, booklist: Array, articlelist: Array}] // 参与活动的用户的信息
}, {versionKey: false})

var activity = mongoose.model('activity', activityschema)

module.exports = activity
