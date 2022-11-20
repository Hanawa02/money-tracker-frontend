<template>
  <div class="p-4 max-w-md mx-auto">
    <div class="flex mb-4">
      <label class="pr-2">Name:</label>
      <input type="text" v-model="name" class="border-b w-full text-center" />
    </div>

    <div
      v-if="errorMessage"
      class="
        bg-lightest-red
        text-dark-red
        rounded
        p-3
        mb-8
        border border-light-red
      "
    >
      {{ errorMessage }}
    </div>
    <button
      @click="addAccount"
      class="bg-red text-white px-4 py-3 rounded text-md font-medium w-full"
    >
      Add Account
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "~/stores/main.store";
import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import routePaths from "~/routes/paths";
import { useRouter } from "vue-router";

const mainStore = useMainStore();

const name = ref<string>("");
const eventDate = ref<Date>(new Date());

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const router = useRouter();
function goToHomePage() {
  router.push(routePaths.homePage.path);
}

const errorMessage = ref("");

async function addAccount() {
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
    errorMessage.value =
      error.value?.response?.data.error || error.value?.response?.data || "";
  }
}
</script>
