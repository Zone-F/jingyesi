import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import Login from 'components/Login'
import Register from 'components/Register'
import Regular from 'components/activity/regular/Regular'
import RegularNew from 'components/activity/regular/RegularNew'
import RegularNow from 'components/activity/regular/RegularNow'
import RegularInfo from 'components/activity/regular/RegularInfo'
import RegularOld from 'components/activity/regular/RegularOld'
import Topic from 'components/activity/topic/Topic'
import TopicNew from 'components/activity/topic/TopicNew'
import TopicNow from 'components/activity/topic/TopicNow'
import TopicInfo from 'components/activity/topic/TopicInfo'
import TopicOld from 'components/activity/topic/TopicOld'
import User from 'components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/login',
      name: '登陆/注册',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/Topic',
      component: Topic,
      children: [
        {path: 'new', name: '主题活动', component: TopicNew},
        {path: '', name: '主题阅读', component: TopicNow},
        {path: 'info', name: '主题信息', component: TopicInfo},
        {path: 'old', name: '往期主题', component: TopicOld}
      ]
    },
    {
      path: '/regular',
      component: Regular,
      children: [
        {path: 'new', name: '发起活动', component: RegularNew},
        {path: '', name: '常规活动', component: RegularNow},
        {path: 'info', name: '活动信息', component: RegularInfo},
        {path: 'old', name: '往期活动', component: RegularOld}
      ]
    },
    {
      path: '/user',
      name: '个人中心',
      component: User
    }
  ]
})
