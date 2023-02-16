<template>
  <label :for="id">
    <m-tag
      :tag="label"
      :disabled="true"
      class="justify-center"
      :class="{
        'bg-extra-light-primary font-medium': modelValue === value,
      }"
    />
  </label>
  <input :id="id" v-model="modelValue" type="radio" class="hidden" :value="value" @change="onChange" />
</template>

<script setup lang="ts">
import MTag from "~/components/MTag.vue";

interface IProps {
  id: string;
  modelValue: string;
  value: string;
  label: string;
}

defineProps<IProps>();
const emit = defineEmits<{ (_event: "update:modelValue", _value: string): void }>();

function onChange(event: Event) {
  const newValue = (event.target as HTMLInputElement).value;
  emit("update:modelValue", newValue);
}
</script>
