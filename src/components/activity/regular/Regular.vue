<template>
  <mu-flex direction="column" style="width: 100%;height: 100%">
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
    getData () {
      this.axios.post('api/getactdata', {})
        .then((response) => {
          const loading = this.$loading({})
          if (response.status === 200) {
            // var data = JSON.parse(response.data)
            this.$store.commit('UPDATE', response.data)
            loading.close()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  components: {
    RegularBottomNav
  },
  created: function () {
    this.getData()
  }
}
</script>

<style scoped>
</style>
