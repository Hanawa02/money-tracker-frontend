import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";
import { useAuthStore } from "~/stores/auth.store";
import { useMainStore } from "~/stores/main.store";
import routes from "../routes";

export default function (to: RouteLocationNormalized): void | Error | RouteLocationRaw | boolean {
  const authStore = useAuthStore();
  const mainStore = useMainStore();

  if (to.query.access_token) {
    const accessToken = to.query.access_token.toString();
    /*  
      always remove the access token from the url, this comes 
      from the backend and should be not easily visible to the user
    */
    delete to.query.access_token;

    authStore.loginUser(accessToken);
    mainStore.loadData();
    return to;
  }

  const localStorageAccessToken = localStorage.getItem("accessToken");
  if (localStorageAccessToken) {
    authStore.loginUser(localStorageAccessToken);
  }

  const isLoginPage = to.name === routes.loginPage.name;

  if (!authStore.isAuthenticated && !isLoginPage) {
    return { name: routes.loginPage.name };
  }

  mainStore.loadData();
  return true;
}
