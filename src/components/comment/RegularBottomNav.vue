<template>
  <mu-container class="bootom-nav">
    <mu-bottom-nav :value.sync=this.$route.name>
      <mu-bottom-nav-item value="发起活动" title="发起活动" icon="note_add" to="/regular/new"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="常规活动" title="常规活动" icon="whatshot" to="/regular" active-class></mu-bottom-nav-item>
      <mu-bottom-nav-item value="活动信息" title="活动信息" icon="favorite" to="/regular/info"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="往期活动" title="往期活动" icon="book" to="/regular/old"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
export default {
  name: 'ActivityBottomNav'
}
</script>

<style scoped>
  .bootom-nav{
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
  }
  .mu-bottom-item-active{
    padding-top: 6px;
    padding-bottom: 5px;
    color: #00bcd4;
  }
</style>
