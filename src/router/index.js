import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import FourOhFour from '../views/FourOhFour.vue'

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
      }, {
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
      }, {
        path: 'learn-more',
        name: 'learn-more',
        component: () => import(/* webpackChunkName: "stats" */ '../views/LearnMore.vue')
      }, {
        path: 'adoption',
        name: 'adoption',
        component: () => import(/* webpackChunkName: "stats" */ '../views/Adoption.vue')
      }, {
        path: 'stats-abbe-pierre',
        name: 'tats-abbe-pierre',
        component: () => import(/* webpackChunkName: "stats" */ '../views/StatsAbbePierre.vue')
      },
    ]
  },
  {
    path: '/*',
    component: FourOhFour,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
