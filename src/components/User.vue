<template>
  <mu-flex direction="column" style="width: 100%;">
    <mu-flex class="is-full-width" fill>
      首页
    </mu-flex>
    <mu-flex  class="is-full-width" >
      <bottom-navigation></bottom-navigation>
    </mu-flex>
  </mu-flex>
</template>

<script>
import BottomNavigation from 'components/comment/BottomNav'

export default {
  name: 'User',
  components: {
    BottomNavigation
  }
}
</script>

<style scoped>
  .is-full-width{
    width: 100%;
  }
</style>
