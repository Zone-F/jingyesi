<template>
  <mu-flex direction="column" style="width: 100%;height: 100vh;">
    <mu-flex class="is-full-width">
        <router-view></router-view>
    </mu-flex>
    <!--<div class="a">3</div>-->
    <mu-flex  class="is-full-width" >
      <!--底部菜单栏-->
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
  methods: {
  },
  components: {
    RegularBottomNav
  }
}
</script>

<style scoped>

</style>
