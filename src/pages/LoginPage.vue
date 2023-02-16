<template>
  <div class="p-4 min-h-screen h-full flex flex-col justify-center">
    <h1 class="text-center mb-12 font-medium text-primary text-4xl w-full">
      {{ $t("pages.login.introduction") }}
    </h1>

    <m-button
      class="bg-[#7289da] text-white mx-auto w-full flex items-center justify-center"
      @click="authenticateWithDiscord"
    >
      <m-icon icon="discord" class="w-6 h-6 mr-2"></m-icon>
      {{ $t("pages.login.loginButtonDiscord") }}
    </m-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAuthStore } from "~/stores/auth.store";

import { useRouter } from "vue-router";
import routePaths from "~/router/routes";

import MButton from "~/components/MButton.vue";
import MIcon from "~/components/icons/MIcon.vue";

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push(routePaths.homePage.path);
  }
});

function authenticateWithDiscord(): void {
  authStore.authenticateWithDiscord();
}
</script>
