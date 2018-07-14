<template>
  <mu-container class="bootom-nav">
    <mu-bottom-nav :value.sync=this.$route.name shift>
      <mu-bottom-nav-item value="首页" title="首页"  to="/" icon="home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="music" title="Music" to="/topic" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="books" title="Books" to="/login" icon="books"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="个人中心" title="用户" to="/user" icon="perm_identity"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
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
  max-width: 100%;
  position: fixed;
  bottom: 0
}
a{
  color: azure;
}
</style>
