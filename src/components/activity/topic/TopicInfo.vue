<template>
  <div style="width: 100%">
    <mu-list style="padding-top: 20px">
      <mu-list-item-title>参与用户及个人书单</mu-list-item-title>
    </mu-list>
    <div v-for="(info, index) in this.$store.state.topic.userinfo" :key="info.id">
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
  </div>
</template>

<script>
export default {
  name: 'TopicInfo',
  data () {
    return {
      panel: 0
    }
  },
  methods: {
    // 手风琴闭合函数
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel
    },
    // 打开读后感
    openArticle (url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>

</style>
