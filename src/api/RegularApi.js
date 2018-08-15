import axios from 'axios'

/*************
 * 常规活动API
 * ***********/
// 发起新活动
let RegularNewAct = (book, rebook, begdate, enddate, username) => axios({
  url: '/regular/newact',
  method: 'post',
  data: {
    book,
    rebook: rebook + '(备选)',
    begdate,
    enddate,
    user: username
  }
})
// 获取当前活动数据
let GetRegulardata = () => axios({
  url: '/regular/getactdata',
  method: 'post'
})
// 更改活动时间
let ChangeDate = (begdate, enddate) => axios({
  url: '/regular/changedate',
  method: 'post',
  data: {
    begdate,
    enddate
  }
})
// 生成书单
let CreateBookList = (booklist, username) => axios({
  url: '/regular/newbooklist',
  method: 'post',
  data: {
    booklist,
    user: username
  }
})
// 用户加入
let UserJoin = (book, rebook, username) => axios({
  url: '/regular/userjoin',
  method: 'post',
  data: {
    book,
    rebook: rebook + '(备选)',
    user: username
  }
})
//获取往期数据
let GetOldData = (page) => axios({
  url: '/regular/getold',
  method: 'post',
  data: {
    page
  }
})
//获取往期活动总数
let GetOldTotal = () => axios({
  url: '/regular/gettotal',
  method: 'post'
})
export {
  RegularNewAct,
  GetRegulardata,
  ChangeDate,
  UserJoin,
  CreateBookList,
  GetOldData,
  GetOldTotal
}
