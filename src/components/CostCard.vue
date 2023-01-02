<template>
  <details class="flex flex-col shadow-card p-3 rounded" v-if="accountPayer">
    <summary class="flex flex-col mb-2">
      <div class="flex gap-2.5 items-center">
        <span class="flex-shrink-0 text-mid-gray text-sm">{{ eventDate }}</span>
        <span class="w-full truncate">{{ description }}</span>

        <span class="flex-shrink-0 w-17 text-right font-semibold"
          >{{ formattedAmount }}<small> €</small></span
        >
      </div>
      <div v-if="cost.tags.length" class="flex flex-wrap mt-2 gap-2">
        <m-tag
          v-for="tag of cost.tags"
          :key="tag"
          :tag="tag"
          :disabled="true"
        />
      </div>
    </summary>
    <div>
      <hr class="my-3 border-lightest-gray" />
      <div class="flex mb-4">
        <span class="flex-shrink-0 mr-2 text-mid-gray">Payer:</span>
        <span
          class="flex-shrink-0 truncate"
          :class="{ 'font-semibold': selectedAccountIsPaying }"
          :title="accountPayer.name"
          >{{ accountPayer.name }}</span
        >
      </div>
      <cost-card-debtor
        class="odd:bg-white-primary"
        v-for="debtor of cost.debtors"
        :key="debtor.id"
        :cost="cost"
        :debtor="debtor"
      />
      <details class="my-2">
        <summary>see full description</summary>
        <span class="w-full">{{ description }}</span>
      </details>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useMainStore } from "~/stores/main.store";

import Cost from "~/interfaces/cost";
import MTag from "~/components/MTag.vue";
import CostCardDebtor from "~/components/CostCardDebtor.vue";

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
