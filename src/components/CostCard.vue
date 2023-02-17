<template>
  <details v-if="accountPayer" class="flex flex-col shadow-card p-3 rounded relative">
    <summary class="flex flex-col mb-2">
      <m-button variant="close-icon" class="absolute -right-3 -top-3 p-1 z-10" @click.prevent="deleteCost">
        <m-icon v-if="isBeingDeleted" icon="euro" class="w-6 h-6 animate-spin mx-auto" />
        <m-icon v-else icon="close" class="w-6 h-6" />
      </m-button>
      <div class="flex gap-2.5 items-center">
        <span class="flex-shrink-0 text-mid-gray text-sm">{{ eventDate }}</span>
        <span class="w-full truncate">{{ description }}</span>

        <span class="flex-shrink-0 w-17.5 text-right font-semibold">{{ formattedAmount }}<small> €</small></span>
      </div>
      <div v-if="cost.tags.length" class="flex flex-wrap mt-2 gap-2">
        <m-tag v-for="tag of cost.tags" :key="tag" :tag="tag" :disabled="true" />
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
        v-for="debtor of cost.debtors"
        :key="debtor.id"
        class="odd:bg-white-primary"
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
import { computed, ref } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useMainStore } from "~/stores/main.store";

import Cost from "~/interfaces/cost";
import MTag from "~/components/MTag.vue";
import MIcon from "~/components/icons/MIcon.vue";
import MButton from "~/components/MButton.vue";
import CostCardDebtor from "~/components/CostCardDebtor.vue";

interface IProps {
  cost: Cost;
}

const props = defineProps<IProps>();

const eventDate = computed(() => useDateFormat(new Date(props.cost.event_date), "DD-MM-YYYY").value);

const mainStore = useMainStore();

const selectedAccount = mainStore.selectedAccount;

const formattedAmount = computed(() => {
  return props.cost.amount.toFixed(2);
});

const description = computed(() => props.cost.description || "-");

const accountPayer = computed(() => mainStore.getAccountById(props.cost.account_id));

const selectedAccountIsPaying = computed(() => accountPayer.value?.id === selectedAccount?.id);

const isBeingDeleted = ref<boolean>(false);

async function deleteCost() {
  isBeingDeleted.value = true;
  await mainStore.deleteCost(props.cost);
  isBeingDeleted.value = false;
  mainStore.loadData();
}
</script>
