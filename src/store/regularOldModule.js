export default {
  state: {
    user: '',
    users: [],
    bookList: [],
    rebookList: [],
    begdate: '',
    enddate: '',
    userinfo: []
  },
  mutations: {
    REGULAR_OLD_UPDATE: (state, data) => {
      // var tmp=data.constructor ===Object && data || data[0];
      var tmp = data[0] || data
      state.user = tmp.user
      state.users = tmp.users
      state.begdate = tmp.begdate
      state.enddate = tmp.enddate
      state.bookList = tmp.book
      state.rebookList = tmp.rebook
      state.userinfo = tmp.userinfo
    }
  },
  actions: {}
}
