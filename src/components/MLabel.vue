<template>
  <label
    class="text-xs mb-1 font-medium select-none"
    :class="{
      'text-mid-error': hasError,
      'cursor-not-allowed text-light-gray': disabled,
      'text-mid-primary': !hasError && !disabled,
    }"
    @click="handleClickEvent"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
interface IProps {
  hasError?: boolean;
  disabled?: boolean;
}

defineProps<IProps>();
const emit = defineEmits<{
  (_event: "click", _mouseEvent: MouseEvent): void;
}>();

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
