<template>
  <label
    :class="`
          text-xs mb-1 font-medium select-none
          ${hasError ? 'text-mid-error' : 'text-mid-primary'}
        `"
    @click="handleClickEvent"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
interface IProps {
  hasError?: boolean;
}

defineProps<IProps>();
const emit = defineEmits<{
  (_event: "click", _mouseEvent: MouseEvent): void;
}>();

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
