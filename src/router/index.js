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
        name: 'video',
        path: 'video',
        // route level code-splitting
        // this generates a separate chunk (stats.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue')
      },
    ]
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue')
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
