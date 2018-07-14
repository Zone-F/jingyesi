<template>
  <mu-container style="padding-top: 10%">
    <mu-form :model="form" class="mu-demo-form" :rules="formRules">
      <mu-form-item prop="book" label="主选图书">
        <mu-text-field v-model="form.book"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="rebook" label="备选图书" :rules="formRules">
        <mu-text-field v-model="form.rebook"></mu-text-field>
      </mu-form-item>
      <mu-date-input  icon="today" label="开始日期" v-model="form.begDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      {{form.begDate}}
      <mu-date-input  icon="today" label="结束日期" v-model="form.endDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-button color="primary" @click="submit">提交</mu-button>
      <!--提示信息-->
      <mu-snackbar :color="successMessage.color" :open.sync="successMessage.open">
        {{successMessage.message}}
        <mu-button flat slot="action" color="#fff" @click="successMessage.open = false">OK</mu-button>
      </mu-snackbar>
      <mu-snackbar :color="errorMessage.color" :open.sync="errorMessage.open">
        {{errorMessage.message}}
        <mu-button flat slot="action" color="#fff" @click="errorMessage.open = false">OK</mu-button>
      </mu-snackbar>
    </mu-form>
  </mu-container>
</template>

<script>
import RegularBottomNav from 'components/comment/RegularBottomNav'

export default {
  name: 'RegularNew',
  components: {
    RegularBottomNav
  },
  data () {
    return {
      value: '2017-08-06',
      form: {
        book: '《》',
        rebook: '《》',
        begDate: '',
        endDate: ''
      },
      formRules: [
        { validate: (val) => !!val, message: '此处必须填写' }
      ],
      successMessage: {
        color: 'success',
        message: '发起成功活动',
        open: false,
        timeout: 3000
      },
      errorMessage: {
        color: 'error',
        message: '操作失败',
        open: false,
        timeout: 3000
      }

    }
  },
  methods: {
    // 发起新活动
    submit () {
      this.axios.post('/newact', {
        book: this.form.book,
        rebook: this.form.rebook + '(备选)',
        begdate: this.form.begDate,
        enddate: this.form.endDate
        // user: this.$store.state.user
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            // 提示信息
            if (this.successMessage.timer) clearTimeout(this.successMessage.timer)
            this.successMessage.open = true
            this.successMessage.timer = setTimeout(() => {
              this.successMessage.open = false
            }, this.successMessage.timeout)
            this.$router.push({name: '常规活动'})
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
  }
}

</script>

<style scoped>
</style>
