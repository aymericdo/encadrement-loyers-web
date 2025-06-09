import { createRouter, createWebHistory } from "vue-router";
import FourOhFour from "../views/FourOhFourPage.vue";
import Home from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    name: "legal",
    path: "/legal",
    // route level code-splitting
    // this generates a separate chunk (stats.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LegalPage.vue"),
  },
  {
    name: "justification",
    path: "/justification",
    component: () => import("../views/JustificationPage.vue"),
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
      import("../views/StatsPage.vue"),
  },
  {
    name: "simulator",
    path: "/simulator",
    redirect: { name: 'verifiez-votre-loyer' }
  },
  {
    name: "verifiez-votre-loyer",
    path: "/verifiez-votre-loyer",
    component: () =>
      import("../views/SimulatorPage.vue"),
  },
  {
    name: "methodologie",
    path: "/methodologie",
    component: () =>
      import("../views/LearnMorePage.vue"),
  },
  {
    name: "adoption",
    path: "/adoption",
    component: () =>
      import("../views/AdoptionPage.vue"),
  },
  {
    name: "observatoire",
    path: "/observatoire",
    component: () =>
      import("../views/ObservatoirePage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: FourOhFour,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
