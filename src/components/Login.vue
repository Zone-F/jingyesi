<template >
    <div class="login-warp" :style="note">
      <div class="content">
        <mu-container>
          <mu-form ref="form" :model="validateForm" class="mu-demo-form form">
            <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
              <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
              <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="cyan500" @click="submit" style="width: 95%">登陆</mu-button>
            </mu-form-item>
            <mu-form-item>
              <mu-button flat color="cyan500" to="/register" style="font-size: 17px">前往注册</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
</template>

<script>
import {Login} from "../api/IndexApi";

export default {
  name: 'Login',
  data () {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
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
          Login(this.validateForm.username, this.validateForm.password)
            .then((response) => {
              if (response.status === 200) {
                console.log(response)
                this.$store.commit('GET_USER', response.data)
                loading.close()
                // 提示信息
                this.$toast.success('登录成功')
                // 路由跳转
                this.$router.push(this.$route.query.redirect || {name: '首页'})
              }
              if (response.status === 201) {
                console.log(response)
                loading.close()
                // 提示信息
                this.$toast.error(response.data.msg)
              }
            })
            .catch((error) => {
              console.log(error)
              loading.close()
              this.$toast.error('登录失败')
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-warp{
  width: 100%;
  height: 100%;
}
.content{
  padding-top: 20%;
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
