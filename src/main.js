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

Vue.use(Vuex)
require('./mock')

Vue.use(MuseUI)
Vue.prototype.axios = axios
export default function elementComponent () {
}
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
