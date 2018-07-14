<template>
  <div id="app">
    <app-bar></app-bar>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
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
</style>
