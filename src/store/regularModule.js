
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
    UPDATE: (state, data) => {
      console.log(data[0])
      state.user = data[0].user
      state.users = data[0].users
      state.begdate = data[0].begdate
      state.enddate = data[0].enddate
      state.bookList = data[0].bookList
      state.rebookList = data[0].rebookList
      state.userinfo = data[0].userinfo
    }
  },
  actions: {}
}
