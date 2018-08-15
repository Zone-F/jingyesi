<template>
  <mu-container style="padding-top: 10%">
    <mu-form :model="form" class="mu-demo-form" :rules="formRules">
      <mu-form-item prop="book" label="活动主题">
        <mu-text-field v-model="form.topic"></mu-text-field>
      </mu-form-item>
      <mu-date-input  icon="today" label="开始日期" v-model="form.begDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-date-input  icon="today" label="结束日期" v-model="form.endDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-button color="cyan500" @click="submit" v-loading="loading1" data-mu-loading-size="24">提交</mu-button>
    </mu-form>
  </mu-container>
</template>

<script>
import {TopicNewAct} from "../../../api/TopicApi";

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
      this.loading1 = true
      TopicNewAct(this.form.topic, this.form.begDate, this.form.endDate, this.$store.state.user).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.loading1 = false
          // 提示信息
          this.$store.commit('TOPIC_UPDATE', response.data)
          this.$toast.success('创建成功')
          this.$router.push({name: '主题阅读'})
        }
      })
        .catch((error) => {
          console.log(error)
          this.loading1 = false
          this.$toast.error('创建失败')
        })
    }
  }
}
</script>

<style scoped>

</style>
