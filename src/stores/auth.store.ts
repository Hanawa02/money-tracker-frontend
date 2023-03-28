import axios from "axios";
import { defineStore } from "pinia";

interface AuthState {
  isAuthenticated: boolean;
  axiosInstance: any;
}

export const useAuthStore = defineStore("Auth", {
  state: (): AuthState => {
    return {
      isAuthenticated: false,
      axiosInstance: null,
    };
  },
  actions: {
    async authenticateWithDiscord() {
      this.logout();

      const apiUrl = import.meta.env.VITE_API_URL;
      const redirectTo = window.location.origin;
      const url = `${apiUrl}/auth/discord?origin_uri=${redirectTo}`;

      window.location.href = url;
    },

    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },

    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
      this.isAuthenticated = false;
    },

    loginUser(accessToken: string) {
      // append access token to all axios calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      this.axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          common: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });
      localStorage.setItem("accessToken", accessToken.toString());
      this.setIsAuthenticated(true);
    },
  },
});
