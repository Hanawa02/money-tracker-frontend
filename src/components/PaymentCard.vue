<template>
  <details
    v-if="accountFrom && accountTo"
    class="flex shadow-card p-3 rounded cursor-pointer"
  >
    <summary class="flex gap-3">
      <span class="flex-shrink-0 text-gray">{{ eventDate }}</span>
      <span
        class="w-full"
        :class="{ 'font-semibold': selectedAccountIsPaying }"
        >{{ accountFrom.name }}</span
      >
      <span class="flex-shrink-0 text-mid-gray">to:</span>
      <span
        class="w-full"
        :class="{ 'font-semibold': selectedAccountIsPaidTo }"
        >{{ accountTo.name }}</span
      >
      <span
        class="flex-shrink-0 w-18 text-right font-semibold"
        :class="{
          'text-mid-primary': selectedAccountIsPaidTo,
          'text-mid-red': selectedAccountIsPaying,
        }"
        >{{ formattedAmount }}<small> €</small></span
      >
    </summary>
    <div>
      <hr class="my-3 border-lightest-gray" />
      {{ description }}
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDateFormat } from "@vueuse/core";

import Payment from "~/interfaces/payment";
import { useMainStore } from "~/stores/main.store";

interface IProps {
  payment: Payment;
}

const props = defineProps<IProps>();

const eventDate = computed(
  () => useDateFormat(new Date(props.payment.event_date), "DD-MM-YYYY").value
);

const mainStore = useMainStore();

const selectedAccount = mainStore.selectedAccount;

const accountFrom = computed(() =>
  mainStore.getAccountById(props.payment.payer_account_id)
);

const accountTo = computed(() =>
  mainStore.getAccountById(props.payment.lender_account_id)
);

const formattedAmount = computed(() => {
  return props.payment.amount.toFixed(2);
});

const description = computed(() => props.payment.description || "-");

const selectedAccountIsPaidTo = computed(
  () => accountTo.value?.id === selectedAccount?.id
);

const selectedAccountIsPaying = computed(
  () => accountFrom.value?.id === selectedAccount?.id
);
</script>
