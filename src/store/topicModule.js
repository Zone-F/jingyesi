export default {
  state: {
    user: '',
    users: [],
    bookList: [],
    topic: [],
    begdate: '',
    enddate: '',
    userinfo: []
  },
  mutations: {
    TOPIC_UPDATE: (state, data) => {
      var tmp = data[0] || data
      state.user = tmp.user
      state.users = tmp.users
      state.begdate = tmp.begdate
      state.enddate = tmp.enddate
      state.bookList = tmp.book
      state.topic = tmp.topic
      state.userinfo = tmp.userinfo
    }
  },
  actions: {}
}
