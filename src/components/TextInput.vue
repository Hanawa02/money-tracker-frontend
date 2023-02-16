<template>
  <div
    :class="`
      flex items-center pt-2 pb-3 px-4
      border rounded-lg shadow-card group ${
        hasError ? 'border-red' : 'border-transparent focus-within:border-light-primary'
      }
    `"
    data-type="input-field"
  >
    <div class="flex flex-col w-full">
      <m-label :has-error="hasError" :disabled="disabled" @click="focusInput">
        {{ label }}
        <span v-if="required" class="ml-0.5 text-gray">*</span>
      </m-label>

      <input
        :id="id"
        ref="input"
        :value="modelValue"
        :disabled="disabled"
        type="text"
        class="w-full outline-none placeholder:text-light-gray bg-transparent"
        :class="{
          'text-black-primary': !disabled,
          'text-gray cursor-not-allowed': disabled,
        }"
        :placeholder="placeholder"
        @input="updateValue"
        @keyup.enter="handleEnterKey"
      />
    </div>
    <m-icon
      v-show="modelValue && !disabled"
      icon="close"
      class="w-6 h-6 text-mid-gray mt-1 hover:text-primary cursor-pointer"
      @click="cleanValue"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useAttrs } from "vue";
import MLabel from "~/components/MLabel.vue";
import MIcon from "~/components/icons/MIcon.vue";

const attrs: unknown = useAttrs();

interface Attrs {
  modelModifiers: {
    lowerCase: boolean;
  };
}

interface IProps {
  label?: string;
  placeholder?: string;
  modelValue: string; // internal reference to v-model
  required?: boolean;
  id: string;
  autofocus?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  required: false,
});

const emit = defineEmits<{
  (_event: "change", _value: string): void;
  (_event: "update:modelValue", _value: string): void;
}>();

const hasError = ref(false);
const input = ref<HTMLInputElement | null>(null);
onMounted((): void => {
  if (props.autofocus) {
    focusInput();
  }
});

function validateInput(newValue: string): void {
  hasError.value = props.required && !newValue;
}

function updateValue(event: Event): void {
  // TODO: does this part work, if yes which type is the correct one?
  let value: string = (event as any)?.target?.value;

  if ((attrs as Attrs)?.modelModifiers?.lowerCase) {
    value = value.toLowerCase();
  }

  validateInput(value);
  emit("update:modelValue", value);
  emit("change", value);
}

function cleanValue(): void {
  emit("update:modelValue", "");
  emit("change", "");
  if (input.value) {
    input.value.value = "";
    validateInput(input.value.value);
  }
}

function focusInput(): void {
  input.value?.focus();
}

function handleEnterKey(): void {}
</script>
