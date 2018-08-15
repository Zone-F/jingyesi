<template>
  <div class="login-warp" :style="{backgroundImage: 'url(' + BgImg + ')'}">
    <div class="content">
      <mu-container>
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="邮箱" help-text="" prop="email" :rules="usernameRules">
            <mu-text-field v-model="validateForm.email" prop="email"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="repassword" :rules="repasswordRules">
            <mu-text-field type="password" v-model="validateForm.repassword" prop="repassword"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="cyan500" @click="submit" style="width: 95%">注册</mu-button>
          </mu-form-item>
          <mu-form-item>
            <mu-button flat color="cyan500" to="/login" style="font-size: 17px">前往登陆</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
  </div>
</template>

<script>
import {Register} from "../api/IndexApi";

export default {
  name: 'Register',
  data () {
    return {
      BgImg: require('../assets/bg.jpg'),
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3, message: '密码长度大于3' }
      ],
      repasswordRules: [
        { validate: (val) => !!val, message: '请再次输入密码' },
        { validate: (val) => val === this.validateForm.password, message: '两次密码不一致' }
      ],
      validateForm: {
        username: '',
        email: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const loading = this.$loading({})
          Register(this.validateForm.username, this.validateForm.password, this.validateForm.email)
            .then((response) => {
              console.log(response)
              if (response.status === 200) {
                loading.close()
                // 提示信息
                this.$toast.success(response.data.msg)
              }
              if (response.status === 201) {
                loading.close()
                // 提示信息
                this.$toast.warning(response.data.msg)
              }
            })
            .catch((error) => {
              console.log(error)
              setTimeout(() => {
                loading.close()
                this.$toast.error('注册失败')
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
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
