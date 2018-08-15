/*****************
 常规活动api
 *****************/

var activityModel = require('../db/activityschema')

// 新活动
exports.newAct = function (req, res, next) {
  console.log(req)
  const book = req.body.book
  const rebook = req.body.rebook
  const user = req.body.user
  const begdate = req.body.begdate
  const enddate = req.body.enddate
  activityModel({book: book, rebook: rebook, user: user, begdate: begdate, enddate: enddate, users: user})
    .save(function (err, result) {
      err ? res.status(201).send('-1') : res.status(200).send(result)
    })
}
// 获取活动数据
exports.getActData = (req, res, next) => {
  activityModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
    err ? res.status(201).send('-1') : res.status(200).send(result)
  })
}
// 新用户加入活动
exports.userJoin = (req, res, next) => {
  const newuser = req.body.user
  const newbook = req.body.book
  const newrebook = req.body.rebook

  activityModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
    if (err) {
      res.status(201).send('-1')
    } else {
      result[0].users.push(newuser)
      result[0].book.push(newbook)
      result[0].rebook.push(newrebook)
      result[0].save(function (err, result) {
        err ? res.status(201).send('-1') : res.status(200).send(result)
      })
    }
  })
}
// 新用户生成书单
exports.newBookList = (req, res, next) => {
  const bookList = req.body.booklist
  const user = req.body.user
  activityModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
    if (err) {
      res.status(201).send('-1')
    } else {
      result[0].userinfo.push({user: user, booklist: bookList})
      result[0].save(function (err, result) {
        err ? res.status(201).send('-1') : res.status(200).send(result)
      })
    }
  })
}
// 用户提交读后感
exports.subArticle = (req, res, next) => {
  const body = req.body.body
  const title = req.body.title
  const user = req.body.user
  activityModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
    if (err) {
      res.status(201).send('-1')
    } else {
      const len = result[0].userinfo.length
      for (let i = 0; i < len; i++) {
        if (user === result[0].userinfo[i].user) {
          result[0].userinfo[i].articlelist.push({title: title, body: body})
          result[0].save(function (err, result) {
            err ? res.status(201).send('-1') : res.status(200).send(result)
          })
        }
      }
    }
  })
}
// 获取往期活动总数
exports.getOldTotal = (req, res, next) => {
  activityModel.find({}, (err, result) => {
    let total = result.length - 1
    // total.toString()
    err ? res.status(201).send('-1') : res.status(200).json({ total: total })
  })
}
// 往期活动数据
exports.getOld = (req, res, next) => {
  activityModel.find({}).sort({'_id': -1}).skip(req.body.page).limit(1).exec(function (err, result) {
    err ? res.status(201).send('-1') : res.status(200).send(result)
  })
}
// 修改活动时间
exports.changeDate = (req, res, next) => {
  activityModel.find({}).sort({'_id': -1}).limit(1).exec(function (result) {
    result[0].begdate = req.body.begdate
    result[0].enddate = req.body.enddate
    result[0].save(function (err, result) {
      err ? res.status(201).send('-1') : res.status(200).send(result)
    })
  })
}
