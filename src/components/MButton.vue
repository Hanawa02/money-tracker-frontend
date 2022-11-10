<template>
  <button
    class="px-4 py-3 rounded text-md font-medium"
    @click="handleClickEvent"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit =
  defineEmits<{ (_event: "click", _mouseEvent: MouseEvent): void }>();

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
