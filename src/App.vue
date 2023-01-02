<template>
  <div class="w-full min-h-screen h-full max-w-md mx-auto">
    <header
      v-if="isAuthenticated"
      class="
        w-full
        border-b border-light-gray
        bg-white
        sticky
        top-0
        flex
        p-4
        items-center
      "
    >
      <button class="underline text-mid-primary" @click="logout">Logout</button>
      <span class="flex items-center w-full justify-center"
        ><img src="/favicon.svg" class="w-6 h-6 flex-shrink-0 mr-2" /> Money
        Tracker</span
      >
      <button
        class="flex items-center"
        v-if="selectedAccountName"
        @click="clearSelectedAccount"
      >
        <span class="text-primary pr-2 font-medium truncate">
          {{ selectedAccountName }}
        </span>
        <div class="p-1 rounded-full bg-lightest-gray">
          <m-icon icon="person" class="flex-shrink-0 w-4 h-4 text-mid-gray" />
        </div>
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
import { useAuthStore } from "./stores/auth.store";
import { useMainStore } from "~/stores/main.store";

import routes from "./router/routes";
import MIcon from "~/components/icons/MIcon.vue";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const router = useRouter();
function logout() {
  authStore.logout();
  router.push({ name: routes.loginPage.name });
}

const mainStore = useMainStore();

const selectedAccountName = computed(
  () => mainStore.selectedAccount?.name || ""
);

function clearSelectedAccount(): void {
  mainStore.selectAccount("");
  router.replace(routes.homePage.path);
}
</script>
