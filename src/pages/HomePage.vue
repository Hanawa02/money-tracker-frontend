<template>
  <div class="p-4">
    <template v-if="!selectedAccount">
      <h1 class="text-center mb-4 font-medium text-primary text-2xl w-full">
        {{ $t("pages.home.introduction") }}
      </h1>
      <h2 class="text-darkest-primary text-center mb-4">
        {{ $t("pages.home.selectAccountText") }}
      </h2>
      <account-search-selector />
    </template>

    <h1
      v-if="selectedAccount"
      class="
        flex
        items-center
        justify-end
        font-medium
        text-2xl
        w-full
        mb-4
        pb-2
        border-b border-light-gray
      "
    >
      <span class="text-primary pr-2">{{ selectedAccount.name }}</span>
      <div class="p-1 rounded-full bg-lightest-gray">
        <person-icon class="flex-shrink-0 w-6 h-6 text-dark-primary" />
      </div>
    </h1>
    <div
      v-if="selectedAccount"
      class="flex-col bg-lightest-gray rounded-md p-4"
    >
      <h2 class="text-lg font-medium text-dark-primary mb-4 w-full">
        {{ $t("pages.home.status") }}
      </h2>
      <div class="flex gap-8 justify-between flex-wrap">
        <snapshot-card
          v-for="snapshot of snapshots"
          :key="snapshot.lender_account.id"
          :snapshot="snapshot"
        />
        <div v-if="!snapshots?.length" class="">
          {{ $t("pages.home.noSnapshot") }}
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 w-full">
      <div class="grid grid-cols-2 gap-4 py-4 px-4 w-full max-w-md mx-auto">
        <m-button
          v-if="selectedAccount"
          class="border border-mid-primary text-mid-primary mx-auto w-full"
          @click="goToCreatePaymentPage"
        >
          {{ $t("pages.home.newPayment") }}
        </m-button>
        <m-button
          v-if="selectedAccount"
          class="
            border border-dark-primary
            bg-dark-primary
            text-white
            mx-auto
            w-full
          "
          @click="goToCreateCostPage"
        >
          {{ $t("pages.home.newCost") }}
        </m-button>
        <m-button
          v-if="selectedAccount"
          class="border border-mid-gray text-mid-gray mx-auto w-full"
          @click="clearSelectedAccount"
        >
          {{ $t("pages.home.logout") }}
        </m-button>
        <m-button
          class="bg-dark-gray text-white mx-auto w-full"
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

import { useRouter } from "vue-router";
import routePaths from "~/routes/paths";

import AccountSearchSelector from "~/components/AccountSearchSelector.vue";
import SnapshotCard from "~/components/SnapshotCard.vue";
import MButton from "~/components/MButton.vue";
import PersonIcon from "~/components/Icons/PersonIcon.vue";

const mainStore = useMainStore();

const selectedAccount = computed(() => mainStore.selectedAccount);

const snapshots = computed(() =>
  mainStore.filteredSnapshots(selectedAccount.value)
);

const router = useRouter();
function goToCreateCostPage() {
  router.push(routePaths.createCostPage.path);
}

function goToCreatePaymentPage() {
  router.push(routePaths.createPaymentPage.path);
}

function goToCreateAccountPage() {
  router.push(routePaths.createAccountPage.path);
}

function clearSelectedAccount(): void {
  mainStore.selectedAccount = undefined;
}
</script>
