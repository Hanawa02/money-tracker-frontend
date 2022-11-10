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
      {{ snapshot.amount }}€
    </div>
  </div>
</template>

<script setup lang="ts">
import Snapshot from "~/interfaces/snapshot";

interface IProps {
  snapshot: Snapshot;
}
defineProps<IProps>();
</script>
