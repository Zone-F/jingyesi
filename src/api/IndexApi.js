import axios from "axios";
// 获取文章总数
let GetArticleTotal = () => axios({
  url: '/articletotle',
  method: 'post'
})
let GetArticle = (page) => axios({
  url: '/article',
  method: 'post',
  data: {
    page
  }
})
let Login = (username, password) => axios({
  url: '/login',
  method: 'post',
  data: {
    username,
    password
  }
})
let Register = (username, password, email) => axios({
  url: '/register',
  method: 'post',
  data: {
    username,
    password,
    email
  }
})
let GetArticleById = (id) => axios({
  url: '/getbyid',
  method: 'post',
  data: {
    id
  }
})

export {
  GetArticleTotal,
  GetArticle,
  Login,
  Register,
  GetArticleById
}
