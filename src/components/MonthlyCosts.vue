<template>
  <div v-if="lastMonthCosts">
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
      <h2 class="col-span-2 font-bold text-lg">{{ lastMonthCosts.month }}</h2>
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
  return Object.values(mainStore.monthlyCosts)[0];
});
</script>
