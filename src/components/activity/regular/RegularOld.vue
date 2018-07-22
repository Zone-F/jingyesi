<template>
  <div style="width: 100%">
    <mu-list style="padding-top: 20px">
      <mu-list-item-title>第1期</mu-list-item-title>
    </mu-list>
    <div v-for="(info, index) in this.$store.state.regular.userinfo" :key="info.id">
      <mu-expansion-panel :expand="panel === index" @change="toggle(index)">
        <div slot="header">{{info.user}}</div>
        <p>书单列表：</p>
        <p v-for="book in info.booklist" :key="book.id">{{book}}</p>
        <p>读后感列表：</p>
        <div v-for="article in info.articlelist" :key="article.id">
          <mu-button flat color="secondary"  @click="openArticle(article.body)">{{article.title}}</mu-button>
        </div>
      </mu-expansion-panel>
    </div>
    <br>
    <mu-row gutter>
      <mu-col sm="12" md="12">
        <mu-pagination raised circle :total="80" :page-count="5" :page-size="3" :current.sync="current"></mu-pagination>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>

export default {
  name: 'RegularOld',
  data () {
    return {
      current: 1
    }
  },
  methods: {
    getOldData () {
      const loading = this.$loading({})
      this.axios.post('/getactOlddata', {})
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit('UPDATE', response.data)
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
    }
  },
  created: function () {
    this.getOldData()
  }
}
</script>

<style scoped>

</style>
