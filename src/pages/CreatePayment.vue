<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.createPayment.header") }}
    </h1>
    <date-input
      v-model="eventDate"
      :label="$t('pages.createPayment.dateInput.label')"
      id="event-date"
      class="mb-4"
    ></date-input>
    <account-selector
      label="From"
      @change="updatePayer"
      :selectedAccountId="payer?.id"
      :hiddenAccountIds="hiddenAccountsForPayer"
      class="mb-4"
    ></account-selector>
    <account-selector
      label="Pay To"
      @change="updateLender"
      :selectedAccountId="lender?.id"
      :hiddenAccountIds="hiddenAccountsForLender"
      class="mb-4"
    ></account-selector>

    <text-input
      v-model="description"
      id="event-description"
      :label="$t('pages.createPayment.descriptionInput.label')"
      :placeholder="$t('pages.createPayment.descriptionInput.placeholder')"
      class="mb-4"
    />
    <number-input
      v-model="amount"
      id="event-description"
      :label="$t('pages.createPayment.amountInput.label')"
      class="mb-4"
    />

    <div
      v-if="errorMessage"
      class="bg-lightest-red text-dark-red rounded p-3 border border-light-red"
    >
      {{ errorMessage }}
    </div>

    <div class="flex gap-4 mt-8">
      <m-button
        @click="goBack"
        class="bg-white border-mid-primary border text-mid-primary w-full"
      >
        {{ $t("pages.createPayment.cancelButton") }}
      </m-button>
      <m-button @click="addPayment" class="bg-mid-primary text-white w-full">
        {{ $t("pages.createPayment.addPaymentButton") }}
      </m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useDateFormat } from "@vueuse/core";

import { useMainStore } from "~/stores/main.store";
import routePaths from "~/router/routes";

import Account from "~/interfaces/account";

import AccountSelector from "~/components/AccountSelector.vue";
import DateInput from "~/components/DateInput.vue";
import TextInput from "~/components/TextInput.vue";
import NumberInput from "~/components/NumberInput.vue";
import MButton from "~/components/MButton.vue";

const mainStore = useMainStore();

mainStore.loadData();

const payer = ref<Account | undefined>(undefined);
const lender = ref<Account | undefined>(undefined);
const amount = ref<number>(0);
const description = ref<string>("");
const eventDate = ref<string>(useDateFormat(new Date(), "YYYY-MM-DD").value);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function updatePayer(id: string) {
  payer.value = mainStore.getAccountById(id);
}

const hiddenAccountsForPayer = computed(() => {
  if (lender.value != undefined) {
    return [lender.value.id];
  }

  return [];
});

function updateLender(id: string) {
  lender.value = mainStore.getAccountById(id);
}

const hiddenAccountsForLender = computed(() => {
  if (payer.value != undefined) {
    return [payer.value.id];
  }

  return [];
});

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

function goBack() {
  router.back();
}
</script>
