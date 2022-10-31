import { createRouter, createWebHistory } from "vue-router";

import Home from "~/pages/HomePage.vue";

declare module "vue-router" {
  export interface RouteMeta {
    titleTranslationKey: string;
  }
}

export const routes = {
  homePage: {
    path: "/",
    component: Home,
    name: "home",
    meta: { titleTranslationKey: "pages.home" },
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes),
});

export default router;
