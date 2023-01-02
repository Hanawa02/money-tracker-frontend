<template>
  <div class="flex py-2">
    <div class="w-full" :class="{ 'font-semibold': selectedAccountIsDebtor }">
      {{ accountDebtor?.name }}
    </div>
    <div class="flex-shrink-0 mr-4 text-gray">
      {{ debtor.percentage }}<small>%</small>
    </div>
    <div class="flex-shrink-0 font-semibold">
      {{ formattedAmount }}<small> €</small>
    </div>
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

const amount = computed((): number => {
  return props.cost.amount * (props.debtor.percentage / 100);
});

const formattedAmount = computed((): string => {
  return amount.value.toFixed(2);
});

const accountDebtor = computed(() =>
  mainStore.getAccountById(props.debtor.account_id)
);

const selectedAccountIsDebtor = computed(
  () => accountDebtor.value?.id === selectedAccount?.id
);
</script>
