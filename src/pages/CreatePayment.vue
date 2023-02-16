<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.createPayment.header") }}
    </h1>
    <date-input
      id="event-date"
      v-model="eventDate"
      :label="$t('pages.createPayment.dateInput.label')"
      class="mb-4"
    ></date-input>
    <account-selector
      label="From"
      :selected-account-id="payer?.id"
      :hidden-account-ids="hiddenAccountsForPayer"
      class="mb-4"
      @change="updatePayer"
    ></account-selector>
    <account-selector
      label="Pay To"
      :selected-account-id="lender?.id"
      :hidden-account-ids="hiddenAccountsForLender"
      class="mb-4"
      @change="updateLender"
    ></account-selector>

    <text-input
      id="event-description"
      v-model="description"
      :label="$t('pages.createPayment.descriptionInput.label')"
      :placeholder="$t('pages.createPayment.descriptionInput.placeholder')"
      class="mb-4"
    />
    <number-input
      id="event-description"
      v-model="amount"
      :label="$t('pages.createPayment.amountInput.label')"
      class="mb-4"
    />

    <div v-if="errorMessage" class="bg-lightest-red text-dark-red rounded p-3 border border-light-red">
      {{ errorMessage }}
    </div>

    <div class="flex gap-4 mt-8">
      <m-button class="bg-white border-mid-primary border text-mid-primary w-full" @click="goBack">
        {{ $t("pages.createPayment.cancelButton") }}
      </m-button>
      <m-button class="bg-mid-primary text-white w-full" @click="addPayment">
        {{ $t("pages.createPayment.addPaymentButton") }}
      </m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useDateFormat } from "@vueuse/core";

import { useMainStore } from "~/stores/main.store";

import Account from "~/interfaces/account";

import AccountSelector from "~/components/AccountSelector.vue";
import DateInput from "~/components/DateInput.vue";
import TextInput from "~/components/TextInput.vue";
import NumberInput from "~/components/NumberInput.vue";
import MButton from "~/components/MButton.vue";
import useNavigation from "~/composables/navigation.composable";

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

function updatePayer(id: string): void {
  payer.value = mainStore.getAccountById(id);
}

const hiddenAccountsForPayer = computed(() => {
  if (lender.value != undefined) {
    return [lender.value.id];
  }

  return [];
});

function updateLender(id: string): void {
  lender.value = mainStore.getAccountById(id);
}

const hiddenAccountsForLender = computed(() => {
  if (payer.value != undefined) {
    return [payer.value.id];
  }

  return [];
});

const { goToHomePage, goBack } = useNavigation();

const errorMessage = ref("");

async function addPayment(): Promise<void> {
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

  const { data, error } = await useAxios(`account/${payer.value?.id}/payment`, payload, instance);

  if (data.value && !error.value) {
    mainStore.loadData();
    goToHomePage();
    return;
  }

  if (error) {
    errorMessage.value = error.value?.response?.data.error || error.value?.response?.data || "";
  }
}
</script>
