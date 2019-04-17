import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/rem'
import './styles/common.css'
import './registerServiceWorker'
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
Vue.use(vConsole)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
