<template>
  <mu-flex direction="column" style="width: 100%;height: 100%">
    <mu-flex fill style="width: 100%;" class="content">
        <router-view></router-view>
    </mu-flex>
    <!--<div class="a">3</div>-->
      <!--底部菜单栏-->
    <mu-flex style="width: 100%">
      <regular-bottom-nav></regular-bottom-nav>
    </mu-flex>
  </mu-flex>
</template>

<script>
import RegularBottomNav from 'components/comment/RegularBottomNav'
export default {
  name: 'Regular',
  data () {
    return {
    }
  },
  components: {
    RegularBottomNav
  }
}
</script>

<style scoped>
  .content{
    top: 0;
    height: calc(100vh - 112px);
  }
</style>
