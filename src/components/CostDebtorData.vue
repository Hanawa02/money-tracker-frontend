<template>
  <div class="grid grid-cols-2 gap-2 relative">
    <button class="absolute -right-2 -top-2 p-1 bg-lightest-primary rounded-full shadow z-10" @click="removeDebtor">
      <m-icon icon="close" class="w-6 h-6" />
    </button>
    <account-selector
      label="Debtor"
      :selected-account-id="debtor.account_id"
      :hidden-account-ids="getFilteredAccountIds()"
      class="col-span-2"
      @change="updateAccountId"
    ></account-selector>

    <text-input
      :id="`percentage-input-${debtor.account_id}`"
      :model-value="debtorPercentage"
      :label="$t('pages.createCost.percentageInput.label')"
      :disabled="true"
    />

    <number-input
      :id="`amount-input-${debtor.account_id}`"
      v-model="debtor.amount"
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
import TextInput from "~/components/TextInput.vue";
import { computed } from "vue";

interface IProps {
  debtor: Debtor;
  debtors: Debtor[];
  costAmount: number;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (_event: "update:debtor", _debtor: Debtor): void;
  (_event: "removeDebtor", _account_id: string): void;
}>();

function removeDebtor() {
  emit("removeDebtor", props.debtor.account_id);
}

function getFilteredAccountIds(): string[] {
  return props.debtors.map((item) => item.account_id).filter((item) => item !== props.debtor.account_id);
}

function updateAccountId(newValue: string): void {
  const debtor = props.debtor;
  debtor.account_id = newValue;

  emit("update:debtor", debtor);
}

const debtorPercentage = computed<string>(() => {
  if (!props.costAmount) {
    return "0";
  }
  return ((props.debtor.amount / props.costAmount) * 100).toFixed(2).replace(".00", "");
});
</script>
