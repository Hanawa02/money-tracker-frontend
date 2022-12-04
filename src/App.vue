<template>
  <div class="w-full min-h-screen h-full max-w-md mx-auto">
    <header
      v-if="isAuthenticated"
      class="
        w-full
        border-b border-light-gray
        sticky
        top-0
        flex
        p-4
        items-center
      "
    >
      <span class="flex items-center w-full justify-center"
        ><img src="/favicon.svg" class="w-6 h-6 flex-shrink-0 mr-2" /> Money
        Tracker</span
      >
      <button class="self-flex-end underline text-mid-primary" @click="logout">
        Logout
      </button>
    </header>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import routes from "./router/routes";
import { useAuthStore } from "./stores/auth.store";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const router = useRouter();
function logout() {
  authStore.logout();
  router.push({ name: routes.loginPage.name });
}
</script>
