<template>
  <div
    class="
      p-4
      shadow-card
      rounded-md
      flex flex-col
      min-w-32
      text-center
      bg-white
    "
  >
    <label class="font-medium mb-1 text-mid-gray text-md">
      {{ snapshot.lender_account.name }}
    </label>
    <div :class="`${snapshot.amount < 0 ? 'text-red' : 'text-mid-primary'}`">
      {{ amountFormatted }}€
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Snapshot from "~/interfaces/snapshot";

interface IProps {
  snapshot: Snapshot;
}
const props = defineProps<IProps>();

const amountFormatted = computed(() => props.snapshot.amount.toFixed(2));
</script>
