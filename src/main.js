import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from './util/rem'
import './styles/common.css'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  rem,
  render: h => h(App)
}).$mount('#app')
