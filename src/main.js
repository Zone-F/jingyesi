// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import FastClick from 'fastclick'
import axios from 'axios'
// VueX
import store from './store/index'
import Vuex from 'vuex'
// muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// muse-ui 插件
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading'
import Toast from 'muse-ui-toast'
import 'muse-ui-message/dist/muse-ui-message.css'
import Message from 'muse-ui-message'

Vue.use(Message)
Vue.use(MuseUI)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Vuex)
// require('./mock')

Vue.prototype.axios = axios

// FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
