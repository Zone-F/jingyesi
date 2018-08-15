var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer  = require('multer')
const fileUpload = require('express-fileupload');

//后台逻辑文件
const index = require('./route/index')
const activity = require('./route/activity')
const topic = require('./route/topic')
const myuser = require('./route/user')


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 访问静态资源
app.use(express.static(path.resolve(__dirname, './dist')));

let upload = multer({ dest: './dist/static/img/avatar' }).any()
// var upload = multer()
app.use(fileUpload());

// 访问单页
app.get('*', function (req, res,next) {
  var html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
  res.send(html);
});

/**********
 * 首页
 * ********/
app.post('/articletotle', index.getArticleTotle)
app.post('/article', index.getArticle)
app.post('/getbyid', index.getArticleById)
app.post('/register',index.doRegister)
app.post('/login',index.doLogin)
/***********
 * 常规活动api
 * *********/
app.post('/regular/newact',activity.newAct)
app.post('/regular/getactdata',activity.getActData)
app.post('/regular/userjoin',activity.userJoin)
app.post('/regular/newbooklist',activity.newBookList)
app.post('/regular/subarticle',activity.subArticle)
app.post('/regular/getold',activity.getOld)
app.post('/regular/gettotal',activity.getOldTotal)
app.post('/regular/changedate',activity.changeDate)
/***********
 * 主题阅读api
 * *********/
app.post('/topic/new',topic.newTopic)
app.post('/topic/getdata',topic.getTopiocData)
app.post('/topic/userjoin',topic.newTopicUser)
app.post('/topic/newlist',topic.newTopicList)
app.post('/topic/newarticle',topic.subTopicArticle)
app.post('/topic/getold',topic.getTopicOld)
app.post('/topic/changedate',topic.TopicChangeDate)
app.post('/topic/gettotal',topic.TopicOldTotal)
/********
 * 用户个人中心API
 ********/
//上传头像
app.post('/user/changeavatar', function(req, res) {
  console.log(req.files); // the uploaded file object
  let avatar = req.files.avatar;

  // Use the mv() method to place the file somewhere on your server
  avatar.mv('dist/static/img/avatar/'+req.files.avatar.name+'.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
})
//获取文章总数
app.post('/user/gettotle',myuser.getArticleTotle)
//获取文章
app.post('/user/getarticle',myuser.getArticle)
//提交文章
app.post('/user/newarticle',myuser.newArticle)
//修改用户名
app.post('/user/changeuser',myuser.changeUsername)
//修改用户邮箱
app.post('/user/changeemail',myuser.changeEmail)
//修改文章
app.post('/user/updata',myuser.updateArticle)
//删除文章
app.post('/user/delete',myuser.deleteArticle)
// 监听
app.listen(3000, function () {
  console.log('success listen...3000');
});
