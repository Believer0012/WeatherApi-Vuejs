import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/weatherGraph',
      name: 'weatherGraph',
      component: () => import('../components/WeatherGraph.vue')

    }
  ],
});

export default router;