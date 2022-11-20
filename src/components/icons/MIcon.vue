<template>
  <div class="inline-block" @click="handleClickEvent">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <component :is="iconTag" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// @ts-ignore
import CloseIcon from "~/components/icons/CloseIcon.vue";
// @ts-ignore
import PersonIcon from "~/components/icons/PersonIcon.vue";
// @ts-ignore
import SearchIcon from "~/components/icons/SearchIcon.vue";

interface IProps {
  icon: string;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (_event: "click", _mouseEvent: MouseEvent): void;
}>();

const iconTag = computed((): string => {
  return `${props.icon}-icon`;
});

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
