<template>
  <div>
    欢迎：{{ this.$store.state.user }}
    <bottom-navigation></bottom-navigation>
  </div>
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

</style>
