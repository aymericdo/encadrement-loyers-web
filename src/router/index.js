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
        name: 'legal',
        path: 'legal',
        // route level code-splitting	
        // this generates a separate chunk (stats.[hash].js) for this route	
        // which is lazy-loaded when the route is visited.	
        component: () => import(/* webpackChunkName: "video" */ '../views/Legal.vue')
      }, {
        path: 'stats',
        name: 'stats',
        component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue')
      },
      {
        path: 'adoption',
        name: 'adoption',
        component: () => import(/* webpackChunkName: "stats" */ '../views/Adoption.vue')
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
