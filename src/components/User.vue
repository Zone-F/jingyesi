<template>
  <mu-flex class="fill-width fill-height" direction="column" align-items="center">
    <mu-flex justify-content="center" align-items="center" direction="column" class="fill-width user-warp">
      <mu-row justify-content="center">
        <mu-avatar :size="100">
          <img :src="'../../static/img/avatar/'+this.$store.state.user.avatar">
        </mu-avatar>
      </mu-row>
      <mu-flex>
        <label for='my_file' class="theme-color">
          <mu-icon left value="backup"></mu-icon>
          修改头像
        </label>
        <input type="file" ref="upload" name="avatar" id='my_file' style="display:none;" accept="image/jpg" @change="changeAvatar" />
      </mu-flex>
      <mu-flex>用户名：{{this.$store.state.user.username}}</mu-flex>
      <mu-flex>邮箱：{{this.$store.state.user.email}}</mu-flex>
    </mu-flex>
    <mu-flex class="fill-width" justify-content="center" fill>
      <mu-container style="padding-left: 0;padding-right: 0">
        <mu-tabs :value.sync="active" indicator-color="yellow" color="cyan200"  center>
          <mu-tab>修改信息</mu-tab>
          <mu-tab @click="myArticle">我的文章</mu-tab>
        </mu-tabs>
        <div v-if="active === 0">
          <mu-flex class="fill-width" align-items="center" direction="column" style="padding-top: 10px">
            <mu-flex class="fill-width" justify-content="start" align-items="center">
              <mu-flex><mu-text-field v-model="email" placeholder="修改邮箱" fill></mu-text-field></mu-flex>
              <mu-flex><mu-button color="cyan500" small flat @click="changeEmail">修改</mu-button></mu-flex>
            </mu-flex>
            <mu-flex class="fill-width" justify-content="start" align-items="center">
              <mu-flex><mu-text-field v-model="username" placeholder="输修改用户名" fill></mu-text-field></mu-flex>
              <mu-flex><mu-button color="cyan500" small flat @click="changeUsername">修改</mu-button>
              </mu-flex>
            </mu-flex>
          </mu-flex>
        </div>
        <div v-if="active === 1" >
          <mu-flex justify-content="start"  direction="column" v-for="data in article" :key="data.id">
            <mu-flex class="fill-width" justify-content="start" align-items="center" style="padding-top: 10px">
              <mu-flex>
                <mu-button flat @click="console.log(data.id)">
                  {{data.title}}
                </mu-button>
              </mu-flex>
              <mu-flex>{{data.time}}</mu-flex>
            </mu-flex>
          </mu-flex>
          <mu-row style="padding-top: 10px">
            <mu-col sm="12" md="12">
              <mu-pagination
                raised="" circle
                :page-count="5"
                :page-size="5"
                @change="myArticle(current)"
                :total="total" :current.sync="current">
              </mu-pagination>
            </mu-col>
          </mu-row>
        </div>
      </mu-container>
    </mu-flex>
  </mu-flex>
</template>

<script>
import * as API from '../api/UserApi'

export default {
  name: 'User',
  data () {
    return {
      active: 0,
      username: '',
      email: '',
      avatar_name: this.$store.state.user.username,
      article: [],
      current: 1,
      total: ''
    };
  },
  methods: {
    //用户上传头像
    changeAvatar (event) {
      const loading = this.$loading({})
      // let reader = new FileReader();
      let img = event.target.files[0];
      let size = img.size;
      if (size > 3145728) {
        alert('请选择3M以内的图片！');
        return false;
      }
      let Form = new FormData();
      Form.append('avatar', img, this.avatar_name);
      API.ChangeAvatar(Form)
        .then((response) => {
          loading.close()
          console.log(response)
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('登录失败')
        })
    },
    //获取文章
    myArticle () {
      const loading = this.$loading({})
      //获取文章总数
      API.getTotle(this.$store.state.user.username)
        .then((response) => {
          this.$set(this.$data, 'total', response.data.total)
          console.log(response)
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('数据获取失败')
        })
      //获取文章
      API.getArticle(this.$store.state.user.username, this.current)
        .then((response) => {
          loading.close()
          this.$set(this.$data, 'article', response.data)
          console.log(response)
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('数据获取失败')
        })
    },
    //更改用户名
    changeUsername () {
      const loading = this.$loading({})
      API.changeUsername(this.$store.state.user.username, this.username)
        .then((response) => {
          loading.close()
          this.$store.commit('GET_USER', response.data[0])
          this.$toast.success('修改成功')
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          this.$toast.error('失败')
        })
    },
    //更改邮箱
    changeEmail () {
      const loading = this.$loading({})

      API.changeemail(this.$store.state.user.username, this.email)
        .then((response) => {
          loading.close()
          this.$store.commit('GET_USER', response.data[0])
          this.$toast.success('修改成功')
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
  @import "../style/common.css";
  .user-warp{
    height: 200px;
  }
</style>
