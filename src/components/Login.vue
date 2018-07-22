<template>
    <div class="login-warp" :style="{backgroundImage: 'url(' + BgImg + ')'}">
      <div class="content">
        <mu-container>
          <mu-form ref="form" :model="validateForm" class="mu-demo-form">
            <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
              <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
              <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="primary" @click="submit" style="width: 95%">登陆</mu-button>
            </mu-form-item>
            <mu-form-item>
              <mu-button flat color="primary" to="/register" style="font-size: 17px">前往注册</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      BgImg: require('../assets/bg.jpg'),
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3, message: '密码长度大于3' }
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const loading = this.$loading({})
          this.axios.post('/login', {
            user: this.validateForm.username,
            pass: this.validateForm.password
          })
            .then((response) => {
              if (response.status === 200) {
                var data = JSON.parse(response.data)
                this.$store.commit('GET_USER', data.user)
                loading.close()
                // 提示信息
                this.$toast.success('登录成功')
                // 路由跳转
                this.$router.push(this.$route.query.redirect || {name: '首页'})
              }
            })
            .catch((error) => {
              console.log(error)
              setTimeout(() => {
                loading.close()
                this.$toast.error('登录失败')
              }, 2000)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-warp{
  /*background: url("../assets/bg.jpg") no-repeat fixed top;*/
  width: 100%;
  height: 100%;
  background-size:100% 100%;
}
.content{
  padding-top: 20%;
}
</style>
