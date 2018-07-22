<template>
  <mu-flex direction="column" style="width: 100%;height: 100%">
    <mu-flex fill style="width: 100%">
      <router-view></router-view>
    </mu-flex>
    <!--底部菜单栏-->
    <mu-flex style="width: 100%">
      <topic-bottom-nav></topic-bottom-nav>
    </mu-flex>
  </mu-flex>
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
