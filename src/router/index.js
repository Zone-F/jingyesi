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
import store from '../store/index'
Vue.use(Router)

const router = new Router({
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
      path: '/user/:username',
      name: '个人中心',
      component: User,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = store.state.user
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的用户名是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
