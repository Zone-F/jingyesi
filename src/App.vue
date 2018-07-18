<template>
  <div id="app">
    <app-bar></app-bar>
    <div class="content">
      <keep-alive>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
    <!--<bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import AppBar from 'components/comment/Nav'
// import BottomNavigation from 'components/comment/BottomNav'

export default {
  name: 'App',
  components: {
    AppBar
    // BottomNavigation
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content{
  flex: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
