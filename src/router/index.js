import { createRouter, createWebHistory } from "vue-router";
import FourOhFour from "../views/FourOhFour.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [{
      name: "video",
      path: "/video",
      // route level code-splitting
      // this generates a separate chunk (stats.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Video.vue"),
    },]
  },
  {
    name: "legal",
    path: "/legal",
    // route level code-splitting
    // this generates a separate chunk (stats.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Legal.vue"),
  },
  {
    name: "justification",
    path: "/justification",
    component: () => import("../views/Justification.vue"),
  },
  {
    name: "stats",
    path: "/stats",
    redirect: "/stats/paris",
  },
  {
    name: "statsCity",
    path: "/stats/:city",
    component: () =>
      import("../views/Stats.vue"),
  },
  {
    name: "simulator",
    path: "/simulator",
    component: () =>
      import("../views/Simulator.vue"),
  },
  {
    name: "learn-more",
    path: "/learn-more",
    component: () =>
      import("../views/LearnMore.vue"),
  },
  {
    name: "adoption",
    path: "/adoption",
    component: () =>
      import("../views/Adoption.vue"),
  },
  {
    name: "stats-abbe-pierre",
    path: "/stats-abbe-pierre",
    redirect: "observatoire",
  },
  {
    name: "observatoire",
    path: "/observatoire",
    component: () =>
      import("../views/Observatoire.vue"),
  },
  {
    path: "/*",
    component: FourOhFour,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
