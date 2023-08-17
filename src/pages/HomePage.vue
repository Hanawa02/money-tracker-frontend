<template>
  <div class="px-4 pt-4 flex flex-col flex-grow">
    <div v-if="!selectedAccount" class="flex-grow">
      <h1 class="text-center mb-4 font-medium text-primary text-2xl w-full">
        {{ $t("pages.home.introduction") }}
      </h1>
      <h2 class="text-darkest-primary text-center mb-4">
        {{ $t("pages.home.selectAccountText") }}
      </h2>
      <account-search-selector />
    </div>

    <div v-if="selectedAccount" class="flex flex-col gap-8 flex-grow">
      <div class="flex-col bg-lightest-gray rounded-md p-4 shrink-0">
        <h2 class="text-lg font-medium text-dark-primary mb-4 w-full">
          {{ $t("pages.home.status") }}
        </h2>
        <div class="flex gap-8 justify-between flex-wrap">
          <snapshot-card v-for="snapshot of snapshots" :key="snapshot.lender_account.id" :snapshot="snapshot" />
          <div v-if="!snapshots?.length" class="">
            {{ $t("pages.home.noSnapshot") }}
          </div>
        </div>
      </div>

      <div class="flex-col bg-lightest-gray rounded-md p-4 shrink-0">
        <h2 class="text-lg font-medium text-dark-primary mb-4 w-full">
          {{ $t("pages.home.monthlyAverages") }}
        </h2>

        <monthly-averages />
      </div>

      <div class="flex-col bg-lightest-gray rounded-md p-4 shrink-0">
        <h2 class="text-lg font-medium text-dark-primary mb-4 w-full">
          {{ $t("pages.home.monthlyCosts") }}
        </h2>

        <monthly-costs />
      </div>
    </div>
    <div class="sticky lg:fixed bottom-0 left-0 w-full bg-white">
      <div class="grid grid-cols-2 gap-4 py-4 lg:px-4 w-full max-w-md mx-auto">
        <template v-if="selectedAccount">
          <m-button class="hidden md:block col-span-2" @click="goToBulkAddCostsPage">
            {{ $t("pages.home.bulkAddCosts") }}
          </m-button>
          <m-button class="mx-auto w-full" variant="primary-outline" @click="goToCreatePaymentPage">
            {{ $t("pages.home.newPayment") }}
          </m-button>
          <m-button class="mx-auto w-full" @click="goToCreateCostPage">
            {{ $t("pages.home.newCost") }}
          </m-button>
          <m-button class="mx-auto w-full" variant="secondary-outline" @click="goToTransactionsPage">
            {{ $t("pages.home.seeTransactions") }}
          </m-button>
        </template>
        <m-button
          class="mx-auto w-full"
          variant="secondary"
          :class="{ 'col-span-2': !selectedAccount }"
          @click="goToCreateAccountPage"
        >
          {{ $t("pages.home.newAccount") }}
        </m-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "~/stores/main.store";

import AccountSearchSelector from "~/components/AccountSearchSelector.vue";
import SnapshotCard from "~/components/SnapshotCard.vue";
import MButton from "~/components/MButton.vue";
import useNavigation from "~/composables/navigation.composable";
import MonthlyCosts from "~/components/MonthlyCosts.vue";
import MonthlyAverages from "~/components/MonthlyAverages.vue";

const mainStore = useMainStore();

const selectedAccount = computed(() => mainStore.selectedAccount);

const snapshots = computed(() => mainStore.filteredSnapshots(selectedAccount.value));

const { goToCreateCostPage, goToCreatePaymentPage, goToCreateAccountPage, goToTransactionsPage, goToBulkAddCostsPage } =
  useNavigation();
</script>
