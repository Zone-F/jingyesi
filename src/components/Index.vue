<template>
  <mu-flex direction="column" style="width: 100%;height: 100%">
    <mu-flex class="is-full-width" fill>
        <mu-list textline="three-line">
          <mu-sub-header>诗酒趁年华</mu-sub-header>
          <mu-row gutter>
            <mu-col sm="12" md="12">
              <mu-pagination
                raised="" circle
               :page-count="5"
               :page-size="5"
               @change="getArticle(current)"
               :total="total" :current.sync="current">
              </mu-pagination>
            </mu-col>
          </mu-row>
          <mu-list-item
            avatar :ripple="false"
            button v-for="(data, index) in articleData"
            :key="data.id"
            style="margin-top: 15px"
            @click="go(data._id)"
          >
            <mu-list-item-action>
              <mu-avatar :size="70">
                <img :src="'../../static/img/avatar/'+ articleData[index].authorAvatar">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title><span style="color: #ff5735;">{{data.title}}</span></mu-list-item-title>
              {{data.body.substr(0,30) + '.....'}}
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
    </mu-flex>
  </mu-flex>
</template>

<script>
import * as api from '../api/IndexApi'

export default {
  name: 'Index',
  data () {
    return {
      current: 1,
      total: '',
      articleData: []
    }
  },
  methods: {
    getTotle () {
      api.GetArticleTotal().then((response) => {
        this.$set(this.$data, 'total', response.data.total)
      })
    },
    getArticle () {
      const loading = this.$loading({})
      api.GetArticle(this.current).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.$set(this.$data, 'articleData', response.data)
          loading.close()
        }
      })
        .catch((error) => {
          console.log(error)
          loading.close()
          this.$toast.error('数据加载失败，请检查网络后重试')
        })
    },
    go (id) {
      let myId = id
      this.$router.push({name: '文章', params: {id: myId}})
    }
  },
  created () {
    this.getTotle()
    this.getArticle()
  },
  watch: {
    '$route' (to, from) {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getTotle()
      this.getArticle()
    }
  }
}
</script>

<style scoped>
  .is-full-width{
    width: 100%;
  }
</style>
