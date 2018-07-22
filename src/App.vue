<template>
  <div id="app">
    <app-bar></app-bar>
    <div class="content">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
    </div>
    <!--<bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import AppBar from 'components/comment/Nav'

export default {
  name: 'App',
  components: {
    AppBar
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
  width: 100%;
  flex: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
