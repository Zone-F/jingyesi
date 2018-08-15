export default {
  state: {
    // 初始化时用sessionStore.getItem('user'),这样子刷新页面就无需重新登录
    username: window.sessionStorage.getItem('user'),
    email: '',
    avatar: ''
  },
  mutations: {
    GET_USER: (state, data) => {
      state.username = data.username
      state.email = data.email
      state.avatar = data.avatar
      window.sessionStorage.setItem('user', data)
    }
  },
  actions: {}
}
