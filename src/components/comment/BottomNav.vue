<template>
  <mu-container class="bootom-nav">
    <mu-bottom-nav :value.sync=this.$route.name shift color="cyan500">
      <mu-bottom-nav-item value="首页" title="首页"  to="/" icon="home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="music" title="Music" to="/topic" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="books" title="Books" to="/login" icon="books"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="个人中心" title="用户" @click.native="go" icon="perm_identity"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
    }
  },
  methods: {
    go () {
      this.$router.push({name: '个人中心', params: {username: this.$store.state.user || 'vip'}})
    }
  }
}
</script>

<style scoped>
*{
  padding-left: 0;
  padding-right: 0;
}
.bootom-nav{
  width: 100%;
}
a{
  color: azure;
}
</style>
