<template>
  <div v-if="monthlyCosts" class="w-full">
    <select class="font-bold text-lg mb-4" v-model="selectedMonth">
      <option v-for="(item, index) of monthlyCosts" :key="index" :value="item.month">
        {{ item.month }}
      </option>
    </select>

    <div class="grid grid-cols-2 gap-x-4 gap-y-2 overflow-auto max-h-48" v-if="monthData">
      <template v-for="(item, index) of monthData.items" :key="index">
        <div class="w-full capitalize">{{ item.tag }}</div>
        <div class="w-full">{{ item.value.toFixed(2) }}€</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();

const monthlyCosts = computed(() => {
  return Object.values(mainStore.monthlyCosts);
});

const selectedMonth = ref<string>("");

watch(monthlyCosts, async (costs) => {
  if (costs.length > 0) {
    selectedMonth.value = costs[0].month;
  }
});

const monthData = computed(() => {
  return mainStore.monthlyCosts[selectedMonth.value];
});
</script>
