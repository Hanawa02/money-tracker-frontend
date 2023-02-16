<template>
  <div class="p-4 mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.bulkAddCosts.header") }}
    </h1>
    <div class="flex gap-8 justify-between">
      <div class="w-full max-w-md p-4 border-extra-light-gray border-2 rounded h-fit">
        <h2 class="text-2xl text-center mb-4 font-semibold text-dark-gray">
          {{ $t("pages.bulkAddCosts.createCost") }}
        </h2>
        <cost-form :partially-reset-fields="true" @update-amount="updateAmount" @update-event-date="updateEventDate" />
      </div>
      <div class="w-full max-w-md border-extra-light-gray border-2 rounded">
        <h2 class="text-2xl text-center font-semibold text-dark-gray px-4 shadow-sm py-4">
          {{ $t("pages.bulkAddCosts.recentCosts") }}
        </h2>
        <div class="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100vh-15rem)] p-4">
          <cost-card
            class="border-2"
            :class="hasSameAmountAndDate(item) ? 'border-red -order-1' : 'border-transparent'"
            v-for="item of mainStore.costs"
            :key="item.id"
            :cost="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CostForm from "~/components/CostForm.vue";
import Cost from "~/interfaces/cost";
import CostCard from "~/components/CostCard.vue";
import { useMainStore } from "~/stores/main.store";
import { useDateFormat } from "@vueuse/shared";
import { reactive } from "vue";

const mainStore = useMainStore();
mainStore.loadData();

const newCost = reactive({
  amount: 0,
  event_date: useDateFormat(new Date(), "YYYY-MM-DD").value,
});

function updateAmount(amount: number): void {
  newCost.amount = amount;
}

function updateEventDate(eventDate: string): void {
  newCost.event_date = eventDate;
}

function hasSameAmountAndDate(item: Cost): boolean {
  return item.amount === newCost.amount && item.event_date === newCost.event_date;
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  @apply w-2;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-lightest-primary rounded-full;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-dark-primary rounded-full;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-mid-primary;
}
</style>
