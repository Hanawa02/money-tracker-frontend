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
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/discord`
      );
      return result.json();
    },
  },
});
