import Vue from 'vue'
import App from './App.vue'
import router from './router'

require('@/assets/css/main.css')
require('@/assets/css/garnett.css')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
