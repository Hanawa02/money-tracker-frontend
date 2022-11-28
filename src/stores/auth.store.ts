import axios from "axios";
import { defineStore } from "pinia";

interface AuthState {
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("Auth", {
  state: (): AuthState => {
    return {
      isAuthenticated: false,
    };
  },
  actions: {
    async authenticateWithDiscord() {
      this.logout();

      const apiUrl = import.meta.env.VITE_API_URL;
      const redirectTo = import.meta.env.VITE_BASE_URL;
      const url = `${apiUrl}/auth/discord?origin_uri=${redirectTo}`;

      window.location.href = url;
    },

    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },

    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      sessionStorage.clear();
      this.isAuthenticated = false;
    },

    loginUser(accessToken: string) {
      // append access token to all axios calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      sessionStorage.setItem("accessToken", accessToken.toString());
      this.setIsAuthenticated(true);
    },
  },
});
