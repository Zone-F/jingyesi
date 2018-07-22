<template>
  <mu-container style="padding-top: 10%">
    <mu-form :model="form" class="mu-demo-form" :rules="formRules">
      <mu-form-item prop="book" label="主题">
        <mu-text-field v-model="form.topic"></mu-text-field>
      </mu-form-item>
      <mu-date-input  icon="today" label="开始日期" v-model="form.begDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-date-input  icon="today" label="结束日期" v-model="form.endDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-button color="secondary" @click="submit" v-loading="loading1" data-mu-loading-size="24">提交</mu-button>
    </mu-form>
  </mu-container>
</template>

<script>
export default {
  name: 'TopicNew',
  data () {
    return {
      loading1: false,
      form: {
        topic: '',
        begDate: '',
        endDate: ''
      },
      formRules: [
        { validate: (val) => !!val, message: '此处必须填写' }
      ]
    }
  },
  methods: {
    // 发起新活动
    submit () {
      this.axios.post('/newact1', {
        topic: this.form.topic,
        begdate: this.form.begDate,
        enddate: this.form.endDate
        // user: this.$store.state.user
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.loading1 = true
            setTimeout(() => {
              this.loading1 = false
            }, 1000)
            // 提示信息
            this.$toast.success('活动创建成功')
            this.$router.push({name: '常规活动'})
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading1 = !this.loading1
          setTimeout(() => {
            this.loading1 = false
          }, 1000)
          this.$toast.error('活动创建失败')
        })
    }
  }
}
</script>

<style scoped>

</style>
