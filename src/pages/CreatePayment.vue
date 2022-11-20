<template>
  <div class="p-4 max-w-md mx-auto">
    <account-selector
      label="From"
      @change="updatePayer"
      :selectedAccountId="payer?.id"
      class="mb-4"
    ></account-selector>
    <account-selector
      label="Pay To"
      @change="updateLender"
      :selectedAccountId="payer?.id"
      class="mb-4"
    ></account-selector>
    <div class="flex mb-4">
      <label class="pr-2">Date:</label>
      <input
        type="date"
        v-model="eventDate"
        class="border-b w-full text-center"
      />
    </div>
    <div class="flex mb-4">
      <label class="pr-2">Description:</label>
      <input
        type="text"
        v-model="description"
        class="border-b w-full text-center"
      />
    </div>
    <div class="flex mb-4">
      <label class="pr-2">Amount:</label>
      <input
        type="number"
        v-model="amount"
        class="border-b w-full text-center"
      />
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
      @click="addPayment"
      class="bg-red text-white px-4 py-3 rounded text-md font-medium w-full"
    >
      Add Payment
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";
import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import Account from "~/interfaces/account";
import AccountSelector from "~/components/AccountSelector.vue";
import { useDateFormat } from "@vueuse/core";
import routePaths from "~/routes/paths";
import { useRouter } from "vue-router";

const mainStore = useMainStore();

mainStore.loadData();

const payer = ref<Account | undefined>(undefined);
const lender = ref<Account | undefined>(undefined);
const amount = ref<number>(0);
const description = ref<string>("");
const eventDate = ref<Date>(new Date());

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function updatePayer(id: string) {
  payer.value = mainStore.getAccountById(id);
}

function updateLender(id: string) {
  lender.value = mainStore.getAccountById(id);
}

const router = useRouter();
function goToHomePage() {
  router.push(routePaths.homePage.path);
}

const errorMessage = ref("");

async function addPayment() {
  const payload = {
    method: "POST",
    data: {
      amount: amount.value,
      description: description.value,
      event_date: useDateFormat(eventDate, "YYYY-MM-DD").value,
      lender_account_id: lender.value?.id,
      payer_account_id: payer.value?.id,
    },
  };

  const { data, error } = await useAxios(
    `account/${payer.value?.id}/payment`,
    payload,
    instance
  );

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
