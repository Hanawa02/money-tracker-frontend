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
      <m-label :has-error="hasError">
        {{ label }}
        <span v-if="required" class="ml-0.5 text-gray">*</span>
      </m-label>

      <select
        name="account"
        :value="selectedAccountId"
        @change="updateSelectedAccount"
        class="w-full"
        :class="{ 'text-gray': !selectedAccountId }"
      >
        <option value="" disabled selected class="text-gray">
          {{ $t("components.accountSelector.noneSelected") }}
        </option>
        <option
          v-for="account of accounts"
          :key="account.id"
          :value="account.id"
          class="text-black"
        >
          {{ account.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";

import MLabel from "~/components/MLabel.vue";

interface IProps {
  label: string;
  selectedAccountId?: string;
  required?: boolean;
}

const mainStore = useMainStore();

const props = withDefaults(defineProps<IProps>(), { required: false });
const emit = defineEmits<{ (_event: "change", _accountId: string): void }>();

function updateSelectedAccount(event: Event) {
  const newValue = (event?.target as HTMLSelectElement).value;

  validateInput(newValue);
  if (newValue !== props.selectedAccountId) {
    emit("change", newValue);
  }
}

const accounts = computed(() => mainStore.accounts);

const hasError = ref(false);

function validateInput(newValue: string): void {
  hasError.value = props.required && !newValue;
}
</script>
