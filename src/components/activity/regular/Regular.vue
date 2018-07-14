<template>
  <div>
    <router-view></router-view>
    <!--底部菜单栏-->
    <regular-bottom-nav></regular-bottom-nav>
  </div>
</template>

<script>
import RegularBottomNav from 'components/comment/RegularBottomNav'
export default {
  name: 'Regular',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    RegularBottomNav
  }
}
</script>

<style scoped>

</style>
