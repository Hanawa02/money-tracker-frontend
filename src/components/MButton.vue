<template>
  <button :class="classes" @click="handleClickEvent">
    <slot> </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MIcon from "~/components/icons/MIcon.vue";

type Variant = "primary" | "primary-outline" | "secondary" | "secondary-outline" | "close-icon";

const variantStyles: Record<Variant, string> = {
  "primary": "bg-dark-primary text-white hover:bg-darkest-primary",
  "primary-outline": "text-mid-primary hover:bg-darkest-primary hover:text-white",
  "secondary": "bg-dark-gray text-white hover:bg-darkest-gray hover:text-white",
  "secondary-outline": "text-mid-gray hover:bg-darkest-gray hover:text-white",
  "close-icon": "bg-lightest-primary rounded-full shadow hover:bg-extra-light-primary ",
};
interface IProps {
  variant?: Variant;
}
const props = withDefaults(defineProps<IProps>(), { variant: "primary" });

const variantClasses = computed(() => {
  return variantStyles[props.variant];
});

const baseClasses = computed(() => {
  if (props.variant === "close-icon") {
    return "";
  }

  return "px-4 py-3 rounded text-md font-medium border text-center border-current";
});

const classes = computed(() => {
  return [baseClasses.value, variantClasses.value].join(" ");
});

const emit = defineEmits<{ (_event: "click", _mouseEvent: MouseEvent): void }>();

function handleClickEvent(event: MouseEvent): void {
  emit("click", event);
}
</script>
