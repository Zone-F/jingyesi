// store index.js
import Vue from 'vue'
import Vuex from 'vuex'
import regularModule from './regularModule'
import regularOldModule from './regularOldModule'
import topicOldModule from './TopicOldModule'
import topicModule from './topicModule'
import userModule from './userModule'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('user'),这样子刷新页面就无需重新登录

export default new Vuex.Store({
  modules: {
    regular: regularModule,
    topic: topicModule,
    regularOld: regularOldModule,
    topicOld: topicOldModule,
    user: userModule
  }
})
