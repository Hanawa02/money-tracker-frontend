<template>
  <div class="flex py-2">
    <div class="w-full" :class="{ 'font-semibold': selectedAccountIsDebtor }">
      {{ accountDebtor?.name }}
    </div>
    <div class="flex-shrink-0 mr-4 text-gray">{{ formattedPercentage }}<small>%</small></div>
    <div class="flex-shrink-0 font-semibold">{{ formattedAmount }}<small> €</small></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "~/stores/main.store";

import Cost from "~/interfaces/cost";
import Debtor from "~/interfaces/debtor";

interface IProps {
  cost: Cost;
  debtor: Debtor;
}

const props = defineProps<IProps>();

const mainStore = useMainStore();

const selectedAccount = mainStore.selectedAccount;

const formattedAmount = computed((): string => {
  return props.debtor.amount.toFixed(2);
});

const formattedPercentage = computed((): string => {
  return ((props.debtor.amount * 100) / props.cost.amount).toFixed(2);
});
const accountDebtor = computed(() => mainStore.getAccountById(props.debtor.account_id));

const selectedAccountIsDebtor = computed(() => accountDebtor.value?.id === selectedAccount?.id);
</script>
