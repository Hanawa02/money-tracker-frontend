export interface RouteData {
  path: string;
  name: string;
}

const homePage: RouteData = {
  path: "/",
  name: "home",
};

const createCostPage: RouteData = {
  path: "/cost/new",
  name: "createCost",
};

const createPaymentPage: RouteData = {
  path: "/payment/new",
  name: "createPayment",
};

const createAccountPage: RouteData = {
  path: "/account/new",
  name: "createAccount",
};

const loginPage: RouteData = {
  path: "/login",
  name: "login",
};

const transactionsPage: RouteData = {
  path: "/transactions",
  name: "transactions",
};

export default {
  homePage,
  createCostPage,
  createPaymentPage,
  createAccountPage,
  loginPage,
  transactionsPage,
};
