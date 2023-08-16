<template>
  <div v-if="months" class="w-full">
    <div class="flex mb-4 gap-x-4">
      <select class="font-bold text-lg" v-model="selectedMonth">
        <option v-for="month of months" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
      <select class="text-lg" v-model="sortBy">
        <option v-for="option of sortOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-2 gap-x-4 gap-y-2 overflow-auto max-h-48" v-if="costs">
      <template v-for="item of costs" :key="item.tag">
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

const months = computed(() => {
  return Object.keys(mainStore.monthlyCosts);
});

const selectedMonth = ref<string>("");

watch(months, async (newMonths) => {
  if (newMonths.length > 0) {
    selectedMonth.value = newMonths[0];
  }
});

const costs = computed(() => {
  const monthData = mainStore.monthlyCosts[selectedMonth.value];

  if (!monthData) {
    return [];
  }
  return monthData.items.sort(sortFunction.value);
});

const sortBy = ref("tag");
const sortOptions = ref(["tag", "value asc", "value desc"]);

interface CostInfo {
  tag: string;
  value: number;
}

const sortFunction = computed(() => {
  return (a: CostInfo, b: CostInfo) => {
    if (sortBy.value === "tag") {
      return a.tag.localeCompare(b.tag);
    }

    if (sortBy.value === "value desc") {
      return b.value - a.value;
    }

    return a.value - b.value;
  };
});
</script>
