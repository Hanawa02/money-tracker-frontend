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

export default {
  homePage,
  createCostPage,
  createPaymentPage,
  createAccountPage,
};
