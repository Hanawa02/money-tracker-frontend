<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.createAccount.header") }}
    </h1>
    <text-input id="account name" v-model="name" label="Name" :required="true" class="mb-8"></text-input>

    <div v-if="errorMessage" class="bg-lightest-red text-dark-red rounded p-3 mb-8 border border-light-red">
      {{ errorMessage }}
    </div>
    <div class="flex gap-4">
      <m-button class="bg-white border-mid-primary border text-mid-primary w-full" @click="goBack">
        {{ $t("pages.createAccount.cancelButton") }}
      </m-button>
      <m-button class="bg-mid-primary text-white w-full" @click="addAccount">
        {{ $t("pages.createAccount.addAccountButton") }}
      </m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "~/stores/main.store";
import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import routePaths from "~/router/routes";
import { useRouter } from "vue-router";

import TextInput from "~/components/TextInput.vue";
import MButton from "~/components/MButton.vue";

const mainStore = useMainStore();

const name = ref<string>("");

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const router = useRouter();
function goToHomePage(): void {
  router.push(routePaths.homePage.path);
}

const errorMessage = ref("");

async function addAccount(): Promise<void> {
  const payload = {
    method: "POST",
    data: {
      name: name.value,
    },
  };

  const { data, error } = await useAxios(`account`, payload, instance);

  if (data.value && !error.value) {
    mainStore.loadData();
    goToHomePage();
    return;
  }

  if (error) {
    errorMessage.value = error.value?.response?.data.error || error.value?.response?.data || "";
  }
}

function goBack(): void {
  router.back();
}
</script>
