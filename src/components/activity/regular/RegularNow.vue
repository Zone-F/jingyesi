<template>
<!--<mu-list>-->
<mu-container fluid style="padding-top: 20px;height: 100%;overflow: auto">
  <mu-row>
    <mu-col sm="12" md="12" >
      <mu-divider></mu-divider>
        <b>发起人：</b>{{this.$store.state.regular.user}}
    </mu-col>
  </mu-row>
  <br>
  <mu-row>
    <mu-col sm="12" md="12">
      <mu-divider></mu-divider>
        <b>参与人员：</b><span v-for="user in this.$store.state.regular.users" :key="user">{{user}}</span>
    </mu-col>
  </mu-row>
  <br>
  <mu-button small
             color="cyan500"
             @click="joinCheck()"><mu-icon left value="grade"></mu-icon>我要加入</mu-button>
  <!--加入活动对话框-->
  <mu-dialog title="加入活动" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert.joinAlert">
    <mu-text-field v-model="joinform.book" placeholder="主选图书"></mu-text-field><br/>
    <mu-text-field v-model="joinform.rebook" placeholder="备选图书"></mu-text-field><br/>
    <mu-button slot="actions"
               flat color="primary"
               v-loading="loading.loading1"
               data-mu-loading-size="24"
               @click="userJoin()">确定</mu-button>
    <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
  </mu-dialog>
  <br>
  <mu-row>
    <mu-col sm="12">
      <mu-divider></mu-divider>
      <b>活动时间：</b>{{this.$store.state.regular.begdate}} &#45;&#45; {{this.$store.state.regular.enddate}}
    </mu-col>
  </mu-row>
  <br>
  <mu-row>
    <mu-col sm="12">
      <mu-button small
                 color="cyan500"
                 @click="openAlert.changeAlert = true"><mu-icon left value="alarm"></mu-icon>修改时间</mu-button>
    </mu-col>
  </mu-row>
  <!--修改时间框-->
  <mu-dialog title="修改时间"
              max-width="80%"
             :esc-press-close="false"
             :overlay-close="false"
             :open.sync="openAlert.changeAlert">
    <mu-date-input v-model="begDate" label="选择开始日期" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
    <mu-date-input v-model="endDate" label="选择结束日期" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
    <mu-button slot="actions" flat color="primary"
               v-loading="loading.loading2"
               data-mu-loading-size="24"
               @click="changeData()">确定</mu-button>
    <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
  </mu-dialog>
  <mu-row>
    <mu-col sm="12" md="12">
      <mu-divider></mu-divider>
        <b>主选图书：</b>
        <mu-flex warp="warp" direction="column">
          <mu-flex :key="book" v-for="book in this.$store.state.regular.bookList" warp="warp">
            <mu-checkbox :value="book" v-model="checkbox.book" :label="book">{{book}}</mu-checkbox>
          </mu-flex>
        </mu-flex>
    </mu-col>
  </mu-row>
  <mu-row>
    <mu-col sm="12">
      <b>备选图书：</b>
      <mu-flex warp="warp" direction="column">
        <mu-flex :key="book" v-for="book in this.$store.state.regular.rebookList" warp="warp">
          <mu-checkbox :value="book" v-model="checkbox.book" :label="book">{{book}}</mu-checkbox>
        </mu-flex>
      </mu-flex>
    </mu-col>
  </mu-row>
  <mu-row>
    <mu-col sm="12">
      <mu-button small
                 color="cyan500"
                 v-loading="loading.loading3"
                 data-mu-loading-size="24"
                 @click="bookList()"><mu-icon left value="description"></mu-icon>生成书单</mu-button>
    </mu-col>
  </mu-row>
</mu-container>

</template>

<script>
import {GetRegulardata, ChangeDate, UserJoin, CreateBookList} from "../../../api/RegularApi"

export default {
  name: 'RegularNow',
  data () {
    return {
      //选择书
      checkbox: {
        book: []
      },
      //加入活动数据
      joinform: {
        book: '《主选图书》',
        rebook: '《备选图书》'
      },
      //修改活动时间数据
      begDate: '',
      endDate: '',
      //关闭diago
      openAlert: {
        joinAlert: false,
        changeAlert: false
      },
      //按钮loding
      loading: {
        loading1: false,
        loading2: false,
        loading3: false
      }
    }
  },
  methods: {
    getData () {
      if (!this.$store.state.regular.user) {
        const loading = this.$loading({})
        GetRegulardata().then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.$store.commit('REGULAR_UPDATE', response.data)
            loading.close()
          }
        })
          .catch((error) => {
            console.log(error)
            loading.close()
            this.$toast.error('数据加载失败，请检查网络后重试')
          })
      }
    },
    //修改时间
    changeData () {
      this.loading.loading2 = true
      ChangeDate(this.begDate, this.endDate).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.$store.commit('REGULAR_UPDATE', response.data)
          this.loading.loading2 = false
          this.openAlert.changeAlert = false
          this.$toast.success('修改成功')
        }
      })
        .catch((error) => {
          console.log(error)
          this.loading.loading2 = false
          this.openAlert.changeAlert = true
          this.$toast.error('修改失败')
        })
    },
    joinCheck () {
      //检测用户是否加入了活动
      let user = this.$store.state.regular.users.find((value) => { return value === this.$store.state.user })
      if (user) {
        this.$toast.warning('您已经加入活动，无需重复')
        return false
      }
      this.openAlert.joinAlert = true
    },
    //用户加入
    userJoin () {
      this.loading.loading1 = true
      UserJoin(this.joinform.book, this.joinform.rebook, this.$store.state.user).then((response) => {
        if (response.status === 200) {
          this.$store.commit('REGULAR_UPDATE', response.data)
          this.loading.loading1 = false
          this.openAlert.joinAlert = false
          this.$toast.success('加入成功')
        }
      })
        .catch((error) => {
          console.log(error)
          this.loading.loading1 = false
          this.openAlert.joinAlert = true
          this.$toast.error('加入失败')
        })
    },
    //生成书单
    bookList () {
      //检测用户是否加入了活动
      let isJoin = this.$store.state.regular.users.find((value) => { return value === this.$store.state.user })
      if (!isJoin) {
        this.$toast.warning('请先加入活动')
        return false
      }
      //检测用户是否已经生成书单
      let user = ''
      for (let item of this.$store.state.regular.userinfo) {
        user = item.user === this.$store.state.user || false
      }
      if (user) {
        this.$toast.warning('您已经生成过书单了')
        return false
      }
      //检测用户是否勾选图书
      if (this.checkbox.book.length < 1) {
        this.$toast.warning('请选择图书来生成书单')
        return false
      }
      //提交用户书单
      this.loading.loading3 = true
      CreateBookList(this.checkbox.book, this.$store.state.user).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.loading.loading3 = false
          this.$store.commit('REGULAR_UPDATE', response.data)
          this.$toast.success('成功')
          this.$router.push({name: '活动信息'})
        }
      })
        .catch((error) => {
          console.log(error)
          this.loading.loading3 = false
          this.$toast.error('失败')
        })
    },
    closeAlertDialog () {
      this.openAlert.joinAlert = false
      this.openAlert.changeAlert = false
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style scoped>
span{
  padding-right: 10px;
}
p{
  padding-top: 10px;
}
</style>
