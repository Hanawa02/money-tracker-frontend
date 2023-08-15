<template>
  <div v-if="lastMonthCosts" class="w-full">
    <h2 class="col-span-2 font-bold text-lg mb-4">{{ lastMonthCosts.month }}</h2>
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 overflow-auto max-h-48">
      <template v-for="(item, index) of lastMonthCosts.items" :key="index">
        <div class="w-full capitalize">{{ item.tag }}</div>
        <div class="w-full">{{ item.value.toFixed(2) }}€</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();

const lastMonthCosts = computed(() => {
  return mainStore.monthlyCosts[0];
});
</script>
