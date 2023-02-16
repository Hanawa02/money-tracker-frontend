<template>
  <button
    class="px-4 py-3 rounded text-md font-medium border text-center border-current"
    :class="variantClasses"
    @click="handleClickEvent"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "primary-outline" | "secondary" | "secondary-outline";

const variantStyles: Record<Variant, string> = {
  "primary": "bg-dark-primary text-white hover:bg-darkest-primary",
  "primary-outline": "text-mid-primary hover:bg-darkest-primary hover:text-white",
  "secondary": "bg-dark-gray text-white hover:bg-darkest-gray hover:text-white",
  "secondary-outline": "text-mid-gray hover:bg-darkest-gray hover:text-white",
};
interface IProps {
  variant?: Variant;
}
const props = withDefaults(defineProps<IProps>(), { variant: "primary" });

const variantClasses = computed(() => {
  return variantStyles[props.variant];
});

const emit = defineEmits<{ (_event: "click", _mouseEvent: MouseEvent): void }>();

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
