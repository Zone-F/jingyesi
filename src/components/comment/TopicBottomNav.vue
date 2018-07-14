<template>
  <mu-container class="bootom-nav">
    <mu-bottom-nav :value.sync=this.$route.name>
      <mu-bottom-nav-item value="主题活动" title="主题活动" icon="note_add" to="/regular/new"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="主题阅读" title="主题阅读" icon="whatshot" to="/regular" active-class></mu-bottom-nav-item>
      <mu-bottom-nav-item value="主题信息" title="主题信息" icon="favorite" to="/regular/info"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="往期主题" title="往期主题" icon="book" to="/regular/old"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
export default {
  name: 'TopicBottomNav'
}
</script>

<style scoped>
  .bootom-nav{
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
    position: fixed;
    bottom: 0
  }
</style>
