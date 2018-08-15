<template>
  <div>
    <mu-text-field v-model="title" placeholder="输入文章标题" full-width></mu-text-field>
    <mu-text-field v-model="content" multi-line :rows="10" placeholder="输入文章正文" full-width></mu-text-field><br/>
    <mu-button color="cyan500" @click="updata">修改文章</mu-button>
  </div>

</template>

<script>
import {GetArticleById} from "../../api/IndexApi";
import {updataArticle} from "../../api/UserApi";

export default {
  name: "UpdataArticle",
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    methods: {
      getArticleById () {
        let id = this.$route.params.id
        console.log(id)
        const loading = this.$loading({})
        GetArticleById(id).then((response) => {
          if (response.status === 200) {
            this.title = response.data.title
            this.content = response.data.content
            loading.close()
          }
        })
          .catch((error) => {
            console.log(error)
            this.$toast.error('数据加载失败，请检查网络后重试')
          })
      },
      //更新文章
      updata () {
        const loading = this.$loading({})
        let id = this.$route.params.id
        updataArticle(id, this.title, this.content)
          .then((response) => {
            loading.close()
            this.$toast.success('修改成功')
            this.$router.push({name: '首页'})
          })
          .catch((error) => {
            loading.close()

            console.log(error)
            this.$toast.error('登录失败')
          })
      }
    },
    created () {
      this.getArticleById()
    }
  }
}
</script>

<style scoped>
  @import "../../style/common.css";
</style>
