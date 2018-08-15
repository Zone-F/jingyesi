<template>
  <div>
    <mu-text-field v-model="title" placeholder="输入文章标题" full-width></mu-text-field>
    <mu-text-field v-model="content" multi-line :rows="10" placeholder="输入文章正文" full-width></mu-text-field><br/>
    <mu-button color="cyan500" @click="submit">提交文章</mu-button>
  </div>

</template>

<script>
import {newArticle} from "../../api/UserApi";

export default {
  name: "NewArticle",
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submit () {
      if (this.title.length === 0 || this.content === 6) {
        this.$toast.warning('内容不能为空')
        return false
      }
      const loading = this.$loading({})
      newArticle(this.title, this.content, this.$store.state.user.username).then((response) => {
        loading.close()
        this.$toast.success('提交成功')
        this.$router.push({name: '首页'})
      })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('失败')
        })
    }
  }
}
</script>

<style scoped>
@import "../../style/common.css";
</style>
