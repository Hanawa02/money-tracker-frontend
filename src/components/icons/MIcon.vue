<template>
  <div @click="handleClickEvent">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <IconComponent />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { defineAsyncComponent } from "vue";

interface IProps {
  icon: string;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (_event: "click", _mouseEvent: MouseEvent): void;
}>();

const iconName = computed((): string => {
  const nameParts = props.icon.split("-");

  return nameParts
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join("");
});

const IconComponent = defineAsyncComponent(() => {
  return import(`~/components/icons/${iconName.value}Icon.vue`);
});

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
