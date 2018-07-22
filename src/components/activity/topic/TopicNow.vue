<template>
  <mu-container fluid style="padding-top: 20px;height: 100%;overflow: auto">
    <mu-row>
      <mu-col sm="12" md="12" >
        <mu-divider></mu-divider>
        <b>当前主题：</b>{{this.$store.state.topic.topic}}
      </mu-col>
    </mu-row>
    <br>
    <mu-row>
      <mu-col sm="12" md="12">
        <mu-divider></mu-divider>
        <b>参与人员：</b><span v-for="user in this.$store.state.topic.users" :key="user">{{user}}</span>
      </mu-col>
    </mu-row>
    <br>
    <mu-button small color="primary" @click="openAlert.joinAlert = true"><mu-icon left value="grade"></mu-icon>我要加入</mu-button>
    <!--加入活动对话框-->
    <mu-dialog title="加入活动" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert.joinAlert">
      <mu-text-field v-model="joinform.book" placeholder="主选图书"></mu-text-field><br/>
      <mu-text-field v-model="joinform.rebook" placeholder="备选图书"></mu-text-field><br/>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">确定</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
    </mu-dialog>
    <br>
    <mu-row>
      <mu-col sm="12">
        <mu-divider></mu-divider>
        <b>活动时间：</b>{{this.$store.state.topic.begdate}} &#45;&#45; {{this.$store.state.topic.enddate}}
      </mu-col>
    </mu-row>
    <br>
    <mu-row>
      <mu-col sm="12">
        <mu-button small color="primary" @click="openAlert.changeAlert = true"><mu-icon left value="alarm"></mu-icon>修改时间</mu-button>
      </mu-col>
    </mu-row>
    <!--修改时间框-->
    <mu-dialog title="修改时间" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert.changeAlert">
      <mu-date-input v-model="changeDate.begDate" label="选择开始日期" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-date-input v-model="changeDate.endDate" label="选择结束日期" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">确定</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
    </mu-dialog>
    <mu-row>
      <mu-col sm="12" md="12">
        <mu-divider></mu-divider>
        <b>主选图书：</b>
        <mu-flex warp="warp" direction="column">
          <mu-flex :key="book" v-for="book in this.$store.state.topic.bookList" warp="warp">
            <mu-checkbox :value="book" v-model="checkbox.book" :label="book">{{book}}</mu-checkbox>
          </mu-flex>
        </mu-flex>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col sm="12">
        <b>备选图书：</b>
        <mu-flex warp="warp" direction="column">
          <mu-flex :key="book" v-for="book in this.$store.state.topic.rebookList" warp="warp">
            <mu-checkbox :value="book" v-model="checkbox.book" :label="book">{{book}}</mu-checkbox>
          </mu-flex>
        </mu-flex>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col sm="12">
        <mu-button small color="primary"><mu-icon left value="description"></mu-icon>生成书单</mu-button>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
export default {
  name: 'TopicNow',
  data () {
    return {
      checkbox: {
        book: []
      },
      joinform: {
        book: '《》',
        rebook: '《》'
      },
      changeDate: {
        begDate: this.$store.state.topic.begdate,
        endDate: this.$store.state.topic.enddate
      },
      openAlert: {
        joinAlert: false,
        changeAlert: false
      }
    }
  },
  methods: {
    getData () {
      const loading = this.$loading({})
      this.axios.post('api/topic/getdata', {})
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$store.commit('TOPIC_UPDATE', response.data)
            loading.close()
          }
        })
        .catch((error) => {
          console.log(error)
          setTimeout(() => {
            loading.close()
            this.$toast.error('数据加载失败，请检查网络后重试')
          }, 3000)
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
