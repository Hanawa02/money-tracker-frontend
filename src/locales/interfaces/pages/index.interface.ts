import HomePage from "~/locales/interfaces/pages/home-page.interface";
import CreateAccountPage from "~/locales/interfaces/pages/create-account-page.interface";
import CreatePaymentPage from "~/locales/interfaces/pages/create-payment-page.interface";
import LoginPage from "~/locales/interfaces/pages/login-page.interface";

export default interface Pages {
  home: HomePage;
  createAccount: CreateAccountPage;
  createPayment: CreatePaymentPage;
  login: LoginPage;
}
