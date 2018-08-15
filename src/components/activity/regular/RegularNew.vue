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
      <mu-date-input  icon="today" label="结束日期" v-model="form.endDate" type="date" label-float full-width value-format="YYYY-MM-DD"></mu-date-input>
      <mu-button color="cyan500" @click="submit" v-loading="loading1" data-mu-loading-size="24">提交</mu-button>
    </mu-form>
  </mu-container>
</template>

<script>
import {RegularNewAct} from '../../../api/RegularApi'

export default {
  name: 'RegularNew',
  data () {
    return {
      loading1: false,
      form: {
        book: '《》',
        rebook: '《》',
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
      RegularNewAct(this.form.book, this.form.rebook, this.form.begDate, this.form.endDate, this.$store.state.user).then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.loading1 = false
          // 提示信息
          this.$store.commit('REGULAR_UPDATE', response.data)
          this.$toast.success('活动创建成功')
          this.$router.push({name: '常规活动'})
        }
      })
        .catch((error) => {
          console.log(error)
          this.loading1 = false
          this.$toast.error('活动创建失败')
        })
    }
  }
}

</script>

<style scoped>
</style>
