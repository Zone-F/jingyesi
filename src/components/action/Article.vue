<template>
  <mu-flex class="fill-width calc-height" direction="column">
    <mu-flex class="fill-width" style="margin: 20px 0" justify-content="center" align-items="center">
      <div>
        <h3>{{article[0].title}}</h3>
      </div>
    </mu-flex>
    <mu-flex class="fill-width" justify-content="center" align-items="center">
      <div>
        <span>{{article[0].author}}</span>
        <span>{{article[0].time}}</span>
      </div>
    </mu-flex>
    <mu-flex class="fill-width" justify-content="start" align-items="start" v-if="this.$store.state.user.username === article[0].author">
      <mu-button fab small color="green" @click="updataArticle">
        <mu-icon value="edit"></mu-icon>
      </mu-button>
      <mu-button fab small color="red" @click="deleteArticle">
        <mu-icon value="delete"></mu-icon>
      </mu-button>
    </mu-flex>
    <mu-flex class="fill-width" fill>
      <div style="white-space:pre-wrap;" class="body">
        {{article[0].body}}
      </div>
    </mu-flex>
  </mu-flex>
</template>

<script>
import {GetArticleById} from "../../api/IndexApi";
import {deleteArticle} from "../../api/UserApi";

export default {
  name: "Article",
  data () {
    return {
      article: ''
    }
  },
  methods: {
    getArticleById () {
      let id = this.$route.params.id
      const loading = this.$loading({})
      GetArticleById(id).then((response) => {
        if (response.status === 200) {
          this.$set(this.$data, 'article', response.data)
          loading.close()
        }
      })
    },
    //更新文章
    updataArticle (id) {
      this.$toast.warning('修改功能暂未开发')
    },
    //删除文章
    deleteArticle () {
      const loading = this.$loading({})
      let id = this.$route.params.id
      deleteArticle(id)
        .then((response) => {
          loading.close()
          console.log(response.data.msg)
          this.$toast.error('删除成功')
          this.$router.push({name: '首页'})
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('失败')
        })
    }
  },
  created () {
    this.getArticleById()
  },
  watch: {
    '$route' (to, from) {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getArticleById()
    }
  }
}
</script>

<style scoped>
@import "../../style/common.css";
.body{
  line-height: 1.8;
  font-family: 宋体;
  font-size: 16px!important;
}
span{
  padding-right: 10px;
}
</style>
