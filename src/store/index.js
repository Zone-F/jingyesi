// store index.js
import Vue from 'vue'
import Vuex from 'vuex'
import regularModule from './regularModule'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('user'),这样子刷新页面就无需重新登录
const state = {
  user: window.sessionStorage.getItem('user')
}
const mutations = {
  GET_USER: (state, data) => {
    // 把用户名存起来
    state.user = data
    window.sessionStorage.setItem('user', data)
  },
  LOGOUT: (state) => {
    // 登出的时候要清除用户名
    state.user = null
    window.sessionStorage.removeItem('user')
  }
}
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    regular: regularModule
  }
})
