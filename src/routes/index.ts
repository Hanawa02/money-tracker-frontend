import { createRouter, createWebHistory } from "vue-router";
import CreateCost from "~/pages/CreateCost.vue";
import CreatePayment from "~/pages/CreatePayment.vue";
import CreateAccount from "~/pages/CreateAccount.vue";

import Home from "~/pages/HomePage.vue";
import paths from "~/routes/paths";

export const routes = {
  homePage: {
    path: paths.homePage,
    component: Home,
    name: "home",
  },
  createCostPage: {
    path: paths.createCostPage,
    component: CreateCost,
    name: "createCost",
  },
  createPaymentPage: {
    path: paths.createPaymentPage,
    component: CreatePayment,
    name: "createPayment",
  },
  createAccountPages: {
    path: paths.createAccountPage,
    component: CreateAccount,
    name: "createAccount",
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes),
});

export default router;
