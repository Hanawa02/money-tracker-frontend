<template>
  <div
    :class="`
      flex flex-col pt-2 pb-3 px-4
      border rounded-lg shadow-card group ${
        hasError
          ? 'border-red'
          : 'border-transparent focus-within:border-light-primary'
      }
    `"
    data-type="input-field"
    data-input-type="tag"
    @click="focusInput"
  >
    <m-label :has-error="hasError" @click="focusInput">
      {{ label }}
      <span v-if="required" class="ml-0.5 text-gray">*</span>
    </m-label>
    <div class="flex gap-2 flex-wrap items-center mt-1">
      <m-tag
        v-for="tag of modelValue"
        :key="tag"
        :tag="tag"
        :class="{ 'motion-safe:animate-ping': duplicatedTag === tag }"
        @click="removeTag(tag)"
      />

      <input
        :id="id"
        ref="tagInput"
        type="text"
        v-model.trim="newTag"
        class="
          hide-dropdown-icon
          outline-none
          text-black-primary
          placeholder:text-light-gray
          w-24
        "
        :placeholder="placeholder"
        list="accountTags"
        @keyup.enter="addNewTag"
        @keydown.backspace="handleBackspaceClick"
      />
      <datalist id="accountTags">
        <option v-for="tag of accountTags" :key="tag" :value="tag"></option>
      </datalist>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import MLabel from "~/components/MLabel.vue";
import MTag from "~/components/MTag.vue";
import { useMainStore } from "~/stores/main.store";

interface IProps {
  label?: string;
  placeholder?: string;
  modelValue: string[]; // internal reference to v-model
  required?: boolean;
  id: string;
}
const props = withDefaults(defineProps<IProps>(), { required: false });

const emit = defineEmits<{
  (_event: "change", _value: string[]): void;
  (_event: "update:modelValue", _value: string[]): void;
}>();

const hasError = ref(false);

const tagInput = ref<HTMLInputElement | null>();
const newTag = ref<string>("");
const duplicatedTag = ref<string>("");

function addNewTag() {
  const tag = newTag.value?.trim();

  if (!tag) {
    return;
  }

  if (props.modelValue.includes(tag)) {
    duplicatedTag.value = tag;
    setTimeout(() => {
      duplicatedTag.value = "";
    }, 300);

    return;
  }

  const tags = [...props.modelValue, tag];

  updateValue(tags);
  newTag.value = "";
  focusInput();
}

function removeTag(tag: string) {
  if (tag && props.modelValue.includes(tag)) {
    const tags = props.modelValue.filter((item) => item !== tag);

    updateValue(tags);
    focusInput();
  }
}

function validateInput(newValue: string[]): void {
  hasError.value = props.required && (!newValue || newValue.length === 0);
}

function updateValue(value: string[]): void {
  // TODO: does this part work, if yes which type is the correct one?
  validateInput(value);
  emit("update:modelValue", value);
  emit("change", value);
}

function focusInput(): void {
  tagInput.value?.focus();
}

function handleBackspaceClick(): void {
  if (newTag.value?.trim()) {
    return;
  }

  const lastTagIndex = props.modelValue.length - 1;

  if (lastTagIndex < 0) {
    return;
  }

  const lastTag = props.modelValue[lastTagIndex];
  removeTag(lastTag);
}

const mainStore = useMainStore();

onMounted(() => {
  mainStore.loadTags();
});

const accountTags = computed(() =>
  mainStore.tags.filter((item) => !props.modelValue.includes(item))
);
</script>

<style>
.hide-dropdown-icon::-webkit-calendar-picker-indicator,
.hide-dropdown-icon::-webkit-list-button {
  color: transparent;
}
</style>
