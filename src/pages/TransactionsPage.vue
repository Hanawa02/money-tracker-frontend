<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.transactions.header") }}
    </h1>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <account-selector
        :label="$t('pages.transactions.filterByAccount')"
        @change="updatedFilterByAccount"
        :selectedAccountId="accountIdFilter"
      ></account-selector>

      <text-input
        v-model="searchFilter"
        id="search-filter"
        :label="$t('pages.transactions.searchFilter.label')"
        :placeholder="$t('pages.transactions.searchFilter.placeholder')"
      />
    </div>

    <div class="mb-4 gap-2 flex flex-col">
      <payment-card
        v-for="payment in filteredPayments"
        :payment="payment"
        :key="payment.id"
        class="flex gap-4 shadow-card p-3 rounded"
      >
      </payment-card>
    </div>

    <div class="flex gap-4 mt-8">
      <m-button
        @click="goBack"
        class="bg-white border-mid-primary border text-mid-primary w-full"
      >
        {{ $t("pages.transactions.goBackButton") }}
      </m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useMainStore } from "~/stores/main.store";

import Payment from "~/interfaces/payment";

import AccountSelector from "~/components/AccountSelector.vue";
import TextInput from "~/components/TextInput.vue";
import MButton from "~/components/MButton.vue";
import PaymentCard from "~/components/PaymentCard.vue";

const mainStore = useMainStore();
mainStore.loadData();

const searchFilter = ref<string>("");

const filteredCosts = computed(() => {
  return mainStore.costs;
});

function filterPaymentBySearch(payment: Payment): boolean {
  return (
    !searchFilter.value ||
    payment.description.includes(searchFilter.value) ||
    payment.amount.toFixed(2).toString().includes(searchFilter.value)
  );
}

const filteredPayments = computed<Payment[]>(() => {
  return mainStore.payments
    .filter(filterPaymentByAccountId)
    .filter(filterPaymentBySearch);
});

const accountIdFilter = ref<string>(mainStore.selectedAccount?.id || "");

function filterPaymentByAccountId(payment: Payment): boolean {
  return (
    !accountIdFilter.value ||
    payment.lender_account_id === accountIdFilter.value ||
    payment.payer_account_id === accountIdFilter.value
  );
}

function updatedFilterByAccount(accountId: string) {
  accountIdFilter.value = accountId;
}

const router = useRouter();

function goBack() {
  router.back();
}
</script>
