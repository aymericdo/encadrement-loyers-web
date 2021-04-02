import { createApp } from 'vue';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router).mount('#app')
// app.config.globalProperties.$domain = 'https://encadrement-loyers.herokuapp.com/'
app.config.globalProperties.$domain = 'http://localhost:3000/'
