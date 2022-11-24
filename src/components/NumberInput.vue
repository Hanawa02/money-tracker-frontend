<template>
  <div
    :class="`
      flex items-center pt-2 pb-3 px-4
      border rounded-lg shadow-card group ${
        hasError
          ? 'border-red'
          : 'border-transparent focus-within:border-light-primary'
      }
    `"
    data-type="input-field"
  >
    <div class="flex flex-col w-full">
      <m-label :has-error="hasError" @click="focusInput">
        {{ label }}
        <span v-if="required" class="ml-0.5 text-gray">*</span>
      </m-label>

      <input
        :id="id"
        ref="input"
        :value="modelValue"
        type="number"
        class="
          w-full
          outline-none
          text-black-primary
          placeholder:text-light-gray
        "
        :placeholder="placeholder"
        @input="updateValue"
        @keyup.enter="handleEnterKey"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MLabel from "~/components/MLabel.vue";

interface IProps {
  label?: string;
  placeholder?: string;
  modelValue: number; // internal reference to v-model
  required?: boolean;
  id: string;
  autofocus?: boolean;
}
const props = withDefaults(defineProps<IProps>(), { required: false });

const emit = defineEmits<{
  (_event: "change", _value: number): void;
  (_event: "update:modelValue", _value: number): void;
}>();

const hasError = ref(false);
const input = ref<HTMLInputElement | null>(null);
onMounted((): void => {
  if (props.autofocus) {
    focusInput();
  }
});

function validateInput(newValue: number): void {
  hasError.value = props.required && !newValue;
}

function updateValue(event: Event): void {
  // TODO: does this part work, if yes which type is the correct one?
  const value: number = (event as any)?.target?.value;
  validateInput(value);
  emit("update:modelValue", value);
  emit("change", value);
}

function focusInput(): void {
  input.value?.focus();
}

function handleEnterKey(): void {}
</script>
