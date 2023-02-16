<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.createCost.header") }}
    </h1>
    <date-input
      id="event-date"
      v-model="eventDate"
      :label="$t('pages.createCost.dateInput.label')"
      class="mb-4"
    ></date-input>
    <account-selector
      label="Payer"
      :selected-account-id="payer?.id"
      class="mb-4"
      @change="updatePayer"
    ></account-selector>
    <text-input
      id="event-description"
      v-model="description"
      :label="$t('pages.createCost.descriptionInput.label')"
      :placeholder="$t('pages.createCost.descriptionInput.placeholder')"
      class="mb-4"
    />
    <number-input
      id="event-description"
      v-model="amount"
      :label="$t('pages.createCost.amountInput.label')"
      :step="0.01"
      :min="0"
      class="mb-4"
    />
    <tag-input id="tags" v-model="tags" :label="$t('pages.createCost.tagInput.label')"></tag-input>

    <div class="flex flex-col justify-center my-8 p-2 shadow-card rounded">
      <h2 class="text-xl font-bold text-mid-primary mb-4">
        {{ $t("pages.createCost.debtors.header") }}
      </h2>

      <template v-for="(debtor, index) of debtors" :key="debtor.account_id">
        <cost-debtor-data
          v-model:debtor="debtors[index]"
          class="mb-6"
          :debtors="debtors"
          :cost-amount="amount"
          @removeDebtor="removeDebtor(debtor.account_id)"
        />
      </template>
      <m-button class="border border-mid-primary text-mid-primary w-full mb-4" @click="addDebtor('')">
        {{ $t("pages.createCost.debtors.addAnotherDebtorButton") }}
      </m-button>
    </div>
    <div v-if="errorMessage" class="bg-lightest-red text-dark-red rounded p-3 mb-8 border border-light-red">
      {{ errorMessage }}
    </div>

    <div class="flex gap-4 mt-8">
      <m-button class="bg-white border-mid-primary border text-mid-primary w-full" @click="goBack">
        {{ $t("pages.createCost.cancelButton") }}
      </m-button>
      <m-button class="bg-mid-primary text-white w-full" @click="addCost">
        {{ $t("pages.createCost.addCostButton") }}
      </m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useMainStore } from "~/stores/main.store";
import { useDateFormat } from "@vueuse/core";
import { useRouter } from "vue-router";

import Account from "~/interfaces/account";
import Debtor from "~/interfaces/debtor";
import routePaths from "~/router/routes";

import AccountSelector from "~/components/AccountSelector.vue";
import DateInput from "~/components/DateInput.vue";
import MButton from "~/components/MButton.vue";
import CostDebtorData from "~/components/CostDebtorData.vue";
import NumberInput from "~/components/NumberInput.vue";
import TagInput from "~/components/TagInput.vue";
import TextInput from "~/components/TextInput.vue";

const mainStore = useMainStore();
mainStore.loadData();

const eventDate = ref<string>(useDateFormat(new Date(), "YYYY-MM-DD").value);
const payer = ref<Account | undefined>(mainStore.selectedAccount);
const description = ref<string>("");
const amount = ref<number>(0.0);
const tags = ref<string[]>([]);

const debtors = ref<Debtor[]>([]);

function updatePayer(id: string, oldAccountId: string | undefined) {
  payer.value = mainStore.getAccountById(id);

  if (oldAccountId) {
    removeDebtor(oldAccountId);
  }

  addDebtor(id);
}

watch(amount, updateDebtorsAmount);

function addDebtor(account_id: string = "") {
  debtors.value.push({
    account_id,
    amount: 0,
  });
  updateDebtorsAmount();
}

const debtorsAmountSum = computed(() =>
  debtors.value.map((debtor) => debtor.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);

function updateDebtorsAmount() {
  const numberOfDebtors = debtors.value.length;
  const valuePerDebtor = parseFloat((amount.value / numberOfDebtors).toFixed(2));
  const lastDebtor = debtors.value.pop();

  debtors.value = debtors.value.map((debtor) => {
    return {
      ...debtor,
      amount: valuePerDebtor,
    };
  });

  if (lastDebtor) {
    const lastDebtorAmount = parseFloat((amount.value - debtorsAmountSum.value).toFixed(2));
    debtors.value.push({
      ...lastDebtor,
      amount: lastDebtorAmount,
    });
  }
}

function removeDebtor(accountId: string) {
  debtors.value = debtors.value.filter((debtor) => debtor.account_id !== accountId);
}

onMounted(() => {
  addDebtor(mainStore.selectedAccount?.id);
});

const router = useRouter();

function goBack() {
  router.back();
}

function goToHomePage() {
  router.push(routePaths.homePage.path);
}

const errorMessage = ref("");

async function addCost() {
  if (!payer.value?.id || debtors.value?.length <= 0 || description.value === "" || amount.value === 0) {
    errorMessage.value = "Some data is missing!";
    return;
  }

  if (debtorsAmountSum.value !== amount.value) {
    errorMessage.value = "The total amount is not matching the sum of individual amounts";
    return;
  }

  const { data, error } = await mainStore.addCost({
    payerId: payer.value?.id,
    debtors: debtors.value,
    description: description.value,
    amount: amount.value,
    eventDate: new Date(eventDate.value),
    tags: tags.value,
  });

  if (data.value && !error.value) {
    mainStore.loadData();
    goToHomePage();
    return;
  }

  if (error) {
    errorMessage.value = error.value?.response?.data.error || error.value?.response?.data || "";
  }
}
</script>
