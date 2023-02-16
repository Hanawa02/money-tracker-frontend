<template>
  <div class="p-4 max-w-md mx-auto pb-24">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.transactions.header") }}
    </h1>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <account-selector
        :label="$t('pages.transactions.filterByAccount')"
        :selected-account-id="accountIdFilter"
        @change="updateFilterByAccount"
      ></account-selector>

      <text-input
        id="search-filter"
        v-model.lowerCase="searchFilter"
        :label="$t('pages.transactions.searchFilter.label')"
        :placeholder="$t('pages.transactions.searchFilter.placeholder')"
      />

      <div class="flex flex-col col-span-2 pt-2 pb-3 px-4 rounded-lg shadow-card">
        <m-label>
          {{ $t("pages.transactions.transactionTypeFilter.label") }}
        </m-label>

        <div class="flex gap-4 mt-1">
          <radio-tag
            id="all-transactions"
            v-model="transactionTypeFilter"
            value="all"
            :label="$t('pages.transactions.transactionTypeFilter.optionLabels.all')"
          />
          <radio-tag
            id="cost-transactions"
            v-model="transactionTypeFilter"
            value="cost"
            :label="$t('pages.transactions.transactionTypeFilter.optionLabels.cost')"
          />
          <radio-tag
            id="payment-transactions"
            v-model="transactionTypeFilter"
            value="payment"
            :label="$t('pages.transactions.transactionTypeFilter.optionLabels.payment')"
          />
        </div>
      </div>
    </div>

    <div class="mb-4 gap-2 flex flex-col">
      <template v-for="item of filteredItems" :key="item.id">
        <payment-card v-if="item.discriminator === 'Payment'" :payment="item" />
        <cost-card v-if="item.discriminator === 'Cost'" :cost="item" />
      </template>
    </div>
  </div>
  <div class="p-4 max-w-md mx-auto bg-white flex fixed w-full bottom-0 left-0">
    <m-button class="bg-white border-mid-primary border text-mid-primary w-full" @click="goBack">
      {{ $t("pages.transactions.goBackButton") }}
    </m-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useMainStore } from "~/stores/main.store";

import Payment from "~/interfaces/payment";
import Cost from "~/interfaces/cost";

import AccountSelector from "~/components/AccountSelector.vue";
import TextInput from "~/components/TextInput.vue";
import MButton from "~/components/MButton.vue";
import PaymentCard from "~/components/PaymentCard.vue";
import CostCard from "~/components/CostCard.vue";
import MLabel from "~/components/MLabel.vue";
import RadioTag from "~/components/RadioTag.vue";

const mainStore = useMainStore();
mainStore.loadData();

const searchFilter = ref<string>("");
const transactionTypeFilter = ref<"all" | "cost" | "payment">("all");

const filteredItems = computed(() => {
  let items: (Cost | Payment)[] = [];
  if (["all", "cost"].includes(transactionTypeFilter.value)) {
    items = [...items, ...filteredCosts.value];
  }

  if (["all", "payment"].includes(transactionTypeFilter.value)) {
    items = [...items, ...filteredPayments.value];
  }

  return items.sort(sortByEventDate);
});

function sortByEventDate(a: Payment | Cost, b: Payment | Cost) {
  const dateA = new Date(a.event_date);
  const dateB = new Date(b.event_date);

  return dateB.getTime() - dateA.getTime();
}

const accountIdFilter = ref<string>(mainStore.selectedAccount?.id || "");

function updateFilterByAccount(accountId: string) {
  accountIdFilter.value = accountId;
}

/* Costs */

const filteredCosts = computed<Cost[]>(() => {
  return mainStore.costs.filter(filterCostBySearch).filter(filterCostByAccountId);
});

function filterCostBySearch(cost: Cost): boolean {
  return (
    !searchFilter.value ||
    cost.description.toLowerCase().includes(searchFilter.value) ||
    cost.amount.toFixed(2).toString().includes(searchFilter.value) ||
    cost.tags.join(" ").toLowerCase().includes(searchFilter.value)
  );
}

function filterCostByAccountId(cost: Cost): boolean {
  return (
    !accountIdFilter.value ||
    cost.account_id === accountIdFilter.value ||
    cost.debtors.map((debtor) => debtor.account_id).includes(accountIdFilter.value)
  );
}

/* Payments */
const filteredPayments = computed<Payment[]>(() => {
  return mainStore.payments.filter(filterPaymentByAccountId).filter(filterPaymentBySearch);
});

function filterPaymentBySearch(payment: Payment): boolean {
  return (
    !searchFilter.value ||
    payment.description.toLowerCase().includes(searchFilter.value) ||
    payment.amount.toFixed(2).toString().includes(searchFilter.value)
  );
}

function filterPaymentByAccountId(payment: Payment): boolean {
  return (
    !accountIdFilter.value ||
    payment.lender_account_id === accountIdFilter.value ||
    payment.payer_account_id === accountIdFilter.value
  );
}

/* Navigation */
const router = useRouter();

function goBack() {
  router.back();
}
</script>
