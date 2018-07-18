<template>
    <div>
      <mu-appbar style="width: 100%;" color="primary">
        {{this.$route.name}}
        <mu-menu slot="right">
          <mu-button flat>MENU</mu-button>
          <mu-list slot="content">
            <mu-list-item
                button
                to="/">
              <mu-list-item-content>
                <mu-list-item-title>首页</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item
              button
              to="/regular">
              <mu-list-item-content>
                <mu-list-item-title>常规活动</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item
              button
              to="/topic">
              <mu-list-item-content>
                <mu-list-item-title>主题阅读</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item
              button
              to="/login"
              v-if="!this.$store.state.user"
            >
              <mu-list-item-content>
                <mu-list-item-title >登录/注册</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item
              @click="go"
              button
              v-else
            >
              <mu-list-item-content>
                <mu-list-item-title >{{this.$store.state.user}}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-appbar>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
    }
  },
  methods: {
    go () {
      this.$router.push({name: '个人中心', params: {username: this.$store.state.user}})
    }
  }
}
</script>

<style scoped>

</style>
