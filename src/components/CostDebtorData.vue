<template>
  <div class="grid grid-cols-2 gap-2 relative">
    <button
      class="
        absolute
        -right-2
        -top-2
        p-1
        bg-lightest-primary
        rounded-full
        shadow
        z-10
      "
      @click="removeDebtor"
    >
      <m-icon icon="close" class="w-6 h-6" />
    </button>
    <account-selector
      label="Debtor"
      @change="updateAccountId"
      :selectedAccountId="debtor.accountId"
      :hiddenAccountIds="getFilteredAccountIds()"
      class="col-span-2"
    ></account-selector>

    <number-input
      v-model="debtor.percentage"
      :id="`percentage-input-${debtor.accountId}`"
      :label="$t('pages.createCost.percentageInput.label')"
      :min="0"
      :max="100"
    />

    <number-input
      v-model="debtor.amount"
      :id="`amount-input-${debtor.accountId}`"
      :disabled="true"
      :label="$t('pages.createCost.amountInput.label')"
      :step="0.01"
    />
  </div>
</template>

<script setup lang="ts">
import Debtor from "~/interfaces/debtor";

import AccountSelector from "~/components/AccountSelector.vue";
import MIcon from "~/components/icons/MIcon.vue";
import NumberInput from "~/components/NumberInput.vue";

interface IProps {
  debtor: Debtor;
  debtors: Debtor[];
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (_event: "update:debtor", _debtor: Debtor): void;
  (_event: "removeDebtor", _accountId: string): void;
}>();

function removeDebtor() {
  emit("removeDebtor", props.debtor.accountId);
}

function getFilteredAccountIds(): string[] {
  return props.debtors
    .map((item) => item.accountId)
    .filter((item) => item !== props.debtor.accountId);
}

function updateAccountId(newValue: string): void {
  const debtor = props.debtor;
  debtor.accountId = newValue;

  emit("update:debtor", debtor);
}
</script>
