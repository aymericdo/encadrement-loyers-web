import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FourOhFour from '../views/FourOhFour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'stats',
        name: 'stats',
        component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue')
      },
    ]
  },
  {
    path: '/*',
    component: FourOhFour,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
