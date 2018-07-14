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
            <mu-button color="primary" @click="submit" style="width: 95%">注册</mu-button>
          </mu-form-item>
          <mu-form-item>
            <mu-button flat color="primary" to="/login" style="font-size: 17px">前往登陆</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
    <!--提示信息-->
    <mu-snackbar :color="successMessage.color" :open.sync="successMessage.open">
      {{successMessage.message}}
      <mu-button flat slot="action" color="#fff" @click="successMessage.open = false">OK</mu-button>
    </mu-snackbar>
    <mu-snackbar :color="errorMessage.color" :open.sync="errorMessage.open">
      {{errorMessage.message}}
      <mu-button flat slot="action" color="#fff" @click="errorMessage.open = false">OK</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
      repasswordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val === this.validateForm.password, message: '两次密码不一致' }
      ],
      validateForm: {
        username: '',
        email: '',
        password: '',
        repassword: ''
      },
      successMessage: {
        color: 'success',
        message: '注册成功',
        open: false,
        timeout: 3000
      },
      errorMessage: {
        color: 'error',
        message: '注册失败',
        open: false,
        timeout: 3000
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.axios.post('/register', {
            user: this.validateForm.username,
            pass: this.validateForm.password,
            email: this.validateForm.email
          })
            .then((response) => {
              if (response.status === 200) {
                // 提示信息
                if (this.successMessage.timer) clearTimeout(this.successMessage.timer)
                this.successMessage.open = true
                this.successMessage.timer = setTimeout(() => {
                  this.successMessage.open = false
                }, this.successMessage.timeout)
              }
            })
            .catch((error) => {
              console.log(error)
              if (this.errorMessage.timer) clearTimeout(this.errorMessage.timer)
              this.errorMessage.open = true
              this.errorMessage.timer = setTimeout(() => {
                this.errorMessage.open = false
              }, this.errorMessage.timeout)
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
