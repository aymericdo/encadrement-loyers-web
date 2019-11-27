import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$domain = 'https://encadrement-loyers.herokuapp.com/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
