import axios from 'axios'

/*************
 * 主题阅读活动API
 * ***********/
// 发起新活动
let TopicNewAct = (topic, begdate, enddate, user) => axios({
  url: '/topic/new',
  method: 'post',
  data: {
    topic,
    begdate,
    enddate,
    user
  }
})
// 获取当前活动数据
let GetTopicdata = () => axios({
  url: '/topic/getdata',
  method: 'post'
})
// 更改活动时间
let ChangeDate = (begdate, enddate) => axios({
  url: '/topic/changedate',
  method: 'post',
  data: {
    begdate,
    enddate
  }
})
// 生成书单
let CreateBookList = (booklist, user) => axios({
  url: '/topic/newlist',
  method: 'post',
  data: {
    booklist,
    user
  }
})
// 用户加入
let UserJoin = (book, rebook, user) => axios({
  url: '/topic/userjoin',
  method: 'post',
  data: {
    book,
    rebook,
    user
  }
})
//获取往期数据
let TopicOldData = (page) => axios({
  url: '/topic/getold',
  method: 'post',
  data: {
    page
  }
})
//获取往期活动总数
let TopicOldTotal = () => axios({
  url: '/topic/gettotal',
  method: 'post'
})
export {
  TopicNewAct,
  GetTopicdata,
  ChangeDate,
  UserJoin,
  CreateBookList,
  TopicOldData,
  TopicOldTotal
}
