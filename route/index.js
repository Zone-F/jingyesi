var md5 = require('md5')
var mongoose = require('mongoose');

var userModel = require('../db/userschema')
var articleModel = require('../db/articleschema')

// 注册
exports.doRegister = function (req, res, next) {
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  var avatar = 'avatar.jpg'

  userModel.findOne({username: username}, function (result) {
    // 检查用户名是否存在
    if (result) {
      res.status(201).send({msg: '用户名已存在'}) // 用户名已存在
    } else {
      // 注册新用户，写入数据库
      password = md5(password) // 密码用md5加密
      // 将新用户写入数据库
      userModel.create({username: username, password: password, email: email, avatar: avatar}, function (err, result) {
        err ? res.status(201).send({msg: '注册失败'}) : res.status(200).send({msg: '注册成功'})
      })
    }
  })
}
// 登陆
exports.doLogin = function (req, res, next) {
  let username = req.body.username
  let password = md5(req.body.password)
  userModel.findOne({username: username, password: password}, function (err, result) {
    if (err) {
      res.status(404)
    }
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(201).send({msg: '用户名或密码错误'}) // 用户名或密码错误
    }
  })
}
/*********
 *文章展示
 ********/
exports.getArticleTotle = function (req, res, next) {
  let total = ''
  articleModel.find({}).countDocuments(function (err, result) {
    total = result
    err ? res.status(201).send('-1') : res.status(200).json({ total: total })
  });
};
//文章分页
exports.getArticle = function (req, res, next) {
  var mypage = req.body.page || 1;
  articleModel.find({}).sort({'_id': -1}).skip(Math.ceil((mypage - 1) * 5)).limit(5).exec(function (err, result) {
    err ? res.status(201).send('-1') : res.status(200).send(result)
  });
};
//根据ID获取文章
exports.getArticleById = function (req, res, next) {
  var _id = mongoose.Types.ObjectId(req.body.id);

  articleModel.find({_id: _id}, function (err, result) {
    err ? res.status(201).send({msg: '获取错误'}) : res.status(200).send(result)
  });
};
