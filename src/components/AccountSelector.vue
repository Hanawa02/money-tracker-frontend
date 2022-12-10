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
        class="w-full bg-transparent"
        :class="{ 'text-gray': !selectedAccountId }"
      >
        <option value="" class="text-gray">
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
import { computed, ref, watch } from "vue";
import { useMainStore } from "~/stores/main.store";

import MLabel from "~/components/MLabel.vue";
import Account from "~/interfaces/account";

interface IProps {
  label: string;
  selectedAccountId?: string;
  required?: boolean;
  hiddenAccountIds?: string[];
}

const mainStore = useMainStore();

const props = withDefaults(defineProps<IProps>(), { required: false });
const emit = defineEmits<{ (_event: "change", _accountId: string): void }>();

function setSelectedAccount(accountId: string) {
  validateInput(accountId);
  if (accountId !== props.selectedAccountId) {
    emit("change", accountId);
  }
}

function updateSelectedAccount(event: Event) {
  const newValue = (event?.target as HTMLSelectElement).value;
  setSelectedAccount(newValue);
}

const accounts = computed(() => {
  if (props.hiddenAccountIds && props.hiddenAccountIds.length > 0) {
    return mainStore.accounts.filter(
      (account) => !props.hiddenAccountIds?.includes(account.id)
    );
  }

  return mainStore.accounts;
});

watch(accounts, (newAccounts: Account[]) => {
  if (newAccounts.length === 1) {
    const newValue = newAccounts[0].id;
    setSelectedAccount(newValue);
  }
});

const hasError = ref(false);

function validateInput(newValue: string): void {
  hasError.value = props.required && !newValue;
}
</script>
