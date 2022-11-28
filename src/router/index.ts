import { createRouter, createWebHistory } from "vue-router";
import paths from "~/router/routes";

import CreateAccount from "~/pages/CreateAccount.vue";
import CreateCost from "~/pages/CreateCost.vue";
import CreatePayment from "~/pages/CreatePayment.vue";
import Home from "~/pages/HomePage.vue";
import Login from "~/pages/LoginPage.vue";
import authGuard from "./guards/auth.guard";
import guards from "./guards";

export const routes = [
  {
    ...paths.homePage,
    component: Home,
  },
  {
    ...paths.createCostPage,
    component: CreateCost,
  },
  {
    ...paths.createPaymentPage,
    component: CreatePayment,
  },
  {
    ...paths.createAccountPage,
    component: CreateAccount,
  },
  {
    ...paths.loginPage,
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// add global guards
guards.forEach((guard) => router.beforeEach(guard));

export default router;
