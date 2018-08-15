var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
var formidable = require('formidable')

const userModel = require('../db/userschema')
const articleModel = require('../db/articleschema')

//得到用户文章总数
exports.getArticleTotle = function (req, res, next) {
  let total = ''
  articleModel.find({author: req.body.username}).countDocuments(function (err, result) {
    total = result
    err ? res.status(201).send('-1') : res.status(200).json({ total: total })
  });
};
//分页获取文章
exports.getArticle = function (req, res, next) {
  let mypage = req.body.page || 1;
  articleModel.find({author: req.body.username}).sort({'_id': -1}).limit(mypage * 5).skip(Math.ceil((mypage - 1) * 5)).exec(function (err, result) {
    err ? res.status(201).send('error') : res.status(200).send(result)
  });
};
//新增文章
exports.newArticle = function (req, res, next) {
  let title = req.body.title
  let body = req.body.body
  let author = req.body.author;
  let date = new Date();
  let mydata = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()/*+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()*/;
  let authorAvatar = ''
  userModel.find({username: author}, function (err, result) {
    if (err) {
      console.log(err)
      return false
    }
    authorAvatar = result[0].avatar
    articleModel.create({title: title, body: body, author: author, time: mydata, authorAvatar: authorAvatar}, function (err, result) {
      err ? res.status(201).send({msg: '文章提交失败'}) : res.status(200).send({msg: '文章提交成功'})
    })
  })
};
//修改用户名
exports.changeUsername = function (req, res, next) {
  //修改用户名要将头像.jpg的名字也更改,以及文章表中发articleAvatar字段更正
  let newUsername = req.body.newusername;
  let oldUsername = req.body.oldusername;
  console.log(req.body)
  let newAvatar = newUsername + '.jpg';
  userModel.find({username: newUsername}, function (err, result) {
    console.log(result)
    if (err) { return false }
    if (result.length === 0) {
      userModel.find({avatar: 'avatar.jpg', username: oldUsername}, function (err, result) {
        if (result.length === 0) {
          let oldpath = path.join(__dirname, '../dist/static/img/avatar/' + oldUsername + '.jpg')
          let newpath = path.join(__dirname, '../dist/static/img/avatar/' + newAvatar)
          //给头像.jpg改名
          fs.rename(oldpath, newpath, function (err, result) {
            if (err) {
              console.log("改名失败");
              console.log(err);
              return false
            }
            //更新文章表中的用户名
            articleModel.updateMany({author: oldUsername}, {author: newUsername, authorAvatar: newAvatar}, function (err, result) {
              if (err) {
                return false
              }
              //更新数据库中的用户表
              userModel.update({username: oldUsername}, {avatar: newAvatar, username: newUsername}, function (err, result) {
                if (err) {
                  return false
                }
                userModel.find({username: newUsername}, function (err, result) {
                  console.log(result)
                  err ? res.status(201).send('error') : res.status(200).send(result)
                })
              });
            });
          });
        } else {
          //更新文章表中的用户名
          articleModel.updateMany({author: oldUsername}, {authorAvatar: newAvatar}, function (err, result) {
            if (err) {
              return false
            }
            //更新数据库中的用户表
            userModel.update({username: oldUsername}, {username: newUsername}, function (err, result) {
              if (err) {
                return false
              }
              userModel.find({username: newUsername}, function (err, result) {
                err ? res.status(201).send('error') : res.status(200).send(result)
              })
            });
          });
        }
      })
    } else {
      res.status(201).send({msg: '用户名已存在'})
    }
  })
};
//修改邮箱
exports.changeEmail = function (req, res, next) {
  userModel.findOneAndUpdate({username: req.body.username},
    {email: req.body.email}, function (err, result) {
      userModel.find({username: req.body.username}, function (err, result) {
        err ? res.status(201).send('error') : res.status(200).send(result)
      })
    });
};
//修改文章
exports.updateArticle = function (req, res, next) {
  var _id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var date = new Date();
  var mydata = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()/*+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()*/;
  articleModel.findOneAndUpdate({_id: _id}, {title: title, body: body, time: mydata}, function (err, result) {
    err ? res.status(201).send({msg: '文章修改失败'}) : res.status(200).send({msg: '文章修改成功'})
  });
};
//删除文章
exports.deleteArticle = function (req, res, next) {
  var _id = mongoose.Types.ObjectId(req.body.id);
  articleModel.findByIdAndRemove({_id: _id}, function (err, result) {
    err ? res.status(201).send({msg: '文章删除失败'}) : res.status(200).send({msg: '文章删除成功'})
  })
};
