<template>
  <mu-flex direction="column" style="width: 100%;height: 100vh;">
    <mu-flex class="is-full-width" fill>
      首页
    </mu-flex>
    <!--<div class="a">3</div>-->
    <mu-flex  class="is-full-width" >
      <bottom-navigation></bottom-navigation>
    </mu-flex>
  </mu-flex>
</template>

<script>
import BottomNavigation from 'components/comment/BottomNav'

export default {
  name: 'Index',
  components: {
    BottomNavigation
  }
}
</script>

<style scoped>

</style>
