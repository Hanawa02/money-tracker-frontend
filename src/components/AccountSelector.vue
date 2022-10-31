<template>
  <div class="p-3 text-lg flex">
    <label class="flex-shrink-0 font-bold pr-2">{{ label }}</label>
    <select
      name="account"
      :value="selectedAccountId"
      @change="updateSelectedAccount"
      class="w-full text-center"
    >
      <option value="">None</option>
      <option v-for="account of accounts" :key="account.id" :value="account.id">
        {{ account.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "~/stores/main.store";

interface IProps {
  label: string;
  selectedAccountId?: string;
}

const mainStore = useMainStore();

const props = defineProps<IProps>();
const emit = defineEmits<{ (_event: "change", _accountId: string): void }>();

function updateSelectedAccount(event: Event) {
  const newValue = (event?.target as HTMLSelectElement).value;

  if (newValue !== props.selectedAccountId) {
    emit("change", newValue);
  }
}

const accounts = computed(() => mainStore.accounts);
</script>
