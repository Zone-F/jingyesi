<template>
  <div style="width: 100%;height: 100%;overflow: auto">
    <br>
    <mu-row gutter>
      <mu-col sm="12" md="12">
        <mu-pagination raised="" circle
                       :page-count="5"
                       @change="getOldData(current)"
                       :total="total" :current.sync="current">
        </mu-pagination>
      </mu-col>
    </mu-row>
    <br>
    <br>
    <mu-container fluid style="padding-top: 20px;height: 100%;overflow: auto">
      <mu-row>
        <mu-col sm="12" md="12" >
          <mu-divider></mu-divider>
          <b>主题：</b>{{this.$store.state.topicOld.topic}}
        </mu-col>
      </mu-row>
      <br>
      <mu-row>
        <mu-col sm="12" md="12" >
          <mu-divider></mu-divider>
          <b>发起人：</b>{{this.$store.state.topicOld.user}}
        </mu-col>
      </mu-row>
      <br>
      <mu-row>
        <mu-col sm="12" md="12">
          <mu-divider></mu-divider>
          <b>参与人员：</b><span v-for="user in this.$store.state.topicOld.users" :key="user">{{user}}</span>
        </mu-col>
      </mu-row>
      <br>
      <br>
      <mu-row>
        <mu-col sm="12">
          <mu-divider></mu-divider>
          <b>活动时间：</b>{{this.$store.state.topicOld.begdate}} &#45;&#45; {{this.$store.state.topicOld.enddate}}
        </mu-col>
      </mu-row>
      <br>
      <mu-row>
        <mu-col sm="12" md="12">
          <mu-divider></mu-divider>
          <b>主选图书：</b>
          <mu-flex warp="warp" direction="column">
            <mu-flex :key="book" v-for="book in this.$store.state.topicOld.bookList" warp="warp">
              {{book}}
            </mu-flex>
          </mu-flex>
        </mu-col>
      </mu-row>
      <mu-row>
        <mu-col sm="12">
          <mu-list style="padding-top: 20px">
            <mu-list-item-title>参与用户及个人书单</mu-list-item-title>
          </mu-list>
        </mu-col>
      </mu-row>
      <mu-row v-for="(info, index) in this.$store.state.topicOld.userinfo" :key="info.id">
        <mu-col sm="12">
          <mu-expansion-panel :expand="panel === index" @change="toggle(index)">
            <div slot="header">{{info.user}}</div>
            <p>书单列表：</p>
            <p v-for="book in info.booklist" :key="book.id">{{book}}</p>
            <p>读后感列表：</p>
            <div v-for="article in info.articlelist" :key="article.id">
              <mu-button flat color="secondary"  @click="openArticle(article.body)">{{article.title}}</mu-button>
            </div>
            <mu-button small color="cyan500">提交读后感</mu-button>
          </mu-expansion-panel>
        </mu-col>
      </mu-row>
    </mu-container>
    <br>
  </div>
</template>

<script>
import {TopicOldData, TopicOldTotal} from "../../../api/TopicApi";

export default {
  name: 'TopicOld',
  data () {
    return {
      current: 1,
      panel: true,
      total: ''
    }
  },
  methods: {
    // 手风琴闭合函数
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel
    },
    getOldTotal () {
      TopicOldTotal().then((response) => {
        if (response.status === 200) {
          let total = response.data.total * 10
          this.$set(this.$data, 'total', total)
        }
      })
        .catch((error) => {
          console.log(error)
          this.$toast.error('数据加载失败，请检查网络后重试')
        })
    },
    getOldData (page) {
      const loading = this.$loading({})
      TopicOldData(this.current).then((response) => {
        this.$store.commit('TOPIC_OLD_UPDATE', response.data)
        if (response.status === 200) {
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
  created: function () {
    this.getOldTotal()
    this.getOldData()
  }
}
</script>

<style scoped>
span{
  padding-right: 10px;
}
</style>
