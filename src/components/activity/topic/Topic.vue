<template>
  <div>
    <router-view></router-view>
    <!--底部菜单栏-->
    <topic-bottom-nav></topic-bottom-nav>
  </div>
</template>

<script>
import TopicBottomNav from 'components/comment/TopicBottomNav'
export default {
  name: 'Topic',
  components: {
    TopicBottomNav
  }
}
</script>

<style scoped>

</style>
