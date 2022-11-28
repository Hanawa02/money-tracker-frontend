<template>
  <div class="p-4">
    <h1 class="text-center mb-4 font-medium text-primary text-2xl w-full">
      Welcome to money tracker!
    </h1>
    <h2 class="text-darkest-primary text-center mb-4"></h2>

    <m-button
      class="border border-mid-gray text-mid-gray mx-auto w-full"
      @click="authenticateWithDiscord"
    >
      {{ $t("pages.login.loginButtonDiscord") }}
    </m-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAuthStore } from "~/stores/auth.store";

import { useRouter } from "vue-router";
import routePaths from "~/routes/paths";

import MButton from "~/components/MButton.vue";

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push(routePaths.homePage.path);
  }
});

function authenticateWithDiscord() {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/discord`;
  // authStore.authenticateWithDiscord();
}
</script>
