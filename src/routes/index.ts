import { createRouter, createWebHistory } from "vue-router";
import paths from "~/routes/paths";

import CreateAccount from "~/pages/CreateAccount.vue";
import CreateCost from "~/pages/CreateCost.vue";
import CreatePayment from "~/pages/CreatePayment.vue";
import Home from "~/pages/HomePage.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
