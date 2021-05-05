import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import elementUI from './use/element-ui'
import filters from './filter'
import 'element-ui/lib/theme-chalk/index.css'
import './index.scss'

Vue.config.productionTip = false
Vue.use(elementUI)
Vue.use(filters)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
