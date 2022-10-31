import { createRouter, createWebHistory } from "vue-router";
import CreateCost from "~/pages/CreateCost.vue";

import Home from "~/pages/HomePage.vue";

export const routes = {
  homePage: {
    path: "/",
    component: Home,
    name: "home",
  },
  createCostPage: {
    path: "/cost/new",
    component: CreateCost,
    name: "createCost",
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes),
});

export default router;
