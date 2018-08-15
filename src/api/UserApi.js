import axios from "axios";
//修改头像
let ChangeAvatar = (img) => axios({
  url: '/user/changeavatar',
  // headers: {'Content-Type': 'multipart/form-data'},
  method: 'post',
  anync: true,
  contentType: false,
  processData: false,
  data: img
})
//获取文章
let getArticle = (username, page) => axios({
  url: '/user/getarticle',
  method: 'post',
  data: {
    username, page
  }
})
//获取文章总数
let getTotle = (username) => axios({
  url: '/user/gettotle',
  method: 'post',
  data: {
    username
  }
})
//提交新文章
let newArticle = (title, body, author) => axios({
  url: '/user/newarticle',
  method: 'post',
  data: {
    title,
    body,
    author
  }
})
//修改文章
let updataArticle = (id, title, body) => axios({
  url: '/user/updata',
  method: 'post',
  data: {
    id, title, body
  }
})
//删除文章
let deleteArticle = (id) => axios({
  url: '/user/delete',
  method: 'post',
  data: {
    id
  }
})
//修改邮箱
let changeemail = (username, email) => axios({
  url: '/user/changeemail',
  method: 'post',
  data: {
    username, email
  }
})
//修改用户名
let changeUsername = (oldusername, newusername) => axios({
  url: '/user/changeuser',
  method: 'post',
  data: {
    oldusername, newusername
  }
})

export {
  ChangeAvatar,
  getArticle,
  getTotle,
  newArticle,
  updataArticle,
  deleteArticle,
  changeemail,
  changeUsername
}
