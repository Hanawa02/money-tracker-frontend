import { createRouter, createWebHistory } from "vue-router";
import paths from "~/router/routes";
import guards from "~/router/guards";

import CreateAccount from "~/pages/CreateAccount.vue";
import CreateCost from "~/pages/CreateCost.vue";
import CreatePayment from "~/pages/CreatePayment.vue";
import Home from "~/pages/HomePage.vue";
import Login from "~/pages/LoginPage.vue";
import Transactions from "~/pages/TransactionsPage.vue";
import BulkAddCosts from "~/pages/BulkAddCosts.vue";

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
  {
    ...paths.transactionsPage,
    component: Transactions,
  },
  {
    ...paths.bulkAddCostsPage,
    component: BulkAddCosts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// add global guards
guards.forEach((guard) => router.beforeEach(guard));

export default router;
