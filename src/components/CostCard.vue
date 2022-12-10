<template>
  <div class="flex flex-col shadow-card p-3 rounded" v-if="accountPayer">
    <div class="flex gap-3 mb-2">
      <span class="flex-shrink-0 text-mid-gray">{{ eventDate }}</span>
      <span class="w-full">{{ description }}</span>

      <span class="flex-shrink-0 text-mid-gray">Payer:</span>
      <span
        class="w-full"
        :class="{ 'font-semibold': selectedAccountIsPaying }"
        >{{ accountPayer.name }}</span
      >

      <span class="flex-shrink-0 w-18 text-right font-semibold"
        >{{ formattedAmount }}<small> €</small></span
      >
    </div>
    <div v-if="cost.tags.length" class="flex flex-wrap mt-2 gap-2">
      <m-tag v-for="tag of cost.tags" :key="tag" :tag="tag" :disabled="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useMainStore } from "~/stores/main.store";

import Cost from "~/interfaces/cost";
import MTag from "~/components/MTag.vue";

interface IProps {
  cost: Cost;
}

const props = defineProps<IProps>();

const eventDate = computed(
  () => useDateFormat(new Date(props.cost.event_date), "DD-MM-YYYY").value
);

const mainStore = useMainStore();

const selectedAccount = mainStore.selectedAccount;

const formattedAmount = computed(() => {
  return props.cost.amount.toFixed(2);
});

const description = computed(() => props.cost.description || "-");

const accountPayer = computed(() =>
  mainStore.getAccountById(props.cost.account_id)
);

const selectedAccountIsPaying = computed(
  () => accountPayer.value?.id === selectedAccount?.id
);
</script>
