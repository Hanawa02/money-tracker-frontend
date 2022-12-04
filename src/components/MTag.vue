<template>
  <div
    @click="handleClick"
    class="
      flex
      items-center
      bg-lightest-primary
      hover:bg-extra-light-primary
      border-light-primary border
      text-dark-primary
      py-0.5
      pr-2
      pl-3
      rounded-full
      cursor-pointer
    "
    data-value="tag"
  >
    {{ tag }}
    <m-icon icon="close" class="w-4 h-4 ml-1 text-black" />
  </div>
</template>

<script setup lang="ts">
import MIcon from "~/components/icons/MIcon.vue";

interface IProps {
  tag: string;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (_event: "click", _value: string): void;
}>();

function handleClick(): void {
  emit("click", props.tag);
}
</script>
