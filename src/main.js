// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import FastClick from 'fastclick'
import axios from 'axios'
import store from './store/index'
import Vuex from 'vuex'
/* import vueg from 'vueg'
import 'vueg/css/transition-min.css'
// 转场动画
const options = {
  duration: '0.3', // 转场动画时长，默认为0.3，单位秒
  firstEntryDuration: '0.6', // 首次进入应用时的渐现动画时长，默认为.6
  sameDepthDisable: true, // url深度相同时禁用动画，默认为false
  shadow: false, // 值为false，转场时没有阴影的层次效果
  disable: false // 禁用转场动画，默认为false，嵌套路由默认为true
}
Vue.use(vueg, router, options) */
Vue.use(Vuex)
require('./mock')

Vue.use(MuseUI)
Vue.prototype.axios = axios

FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
