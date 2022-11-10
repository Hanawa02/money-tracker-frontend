<template>
  <div class="p-4">
    <template v-if="!selectedAccount">
      <h1 class="text-center mb-4 font-medium text-primary text-2xl w-full">
        Welcome to money tracker!
      </h1>
      <h2 class="text-darkest-primary text-center mb-4">
        Select your account to start using the app.
      </h2>
      <account-search-selector />
    </template>

    <h1
      v-if="selectedAccount"
      class="text-center font-medium text-2xl w-full mb-4"
    >
      Welcome <span class="text-primary">{{ selectedAccount.name }}</span
      >!
    </h1>
    <div
      v-if="selectedAccount"
      class="flex-col bg-lightest-gray rounded-md p-4"
    >
      <h2 class="text-lg font-medium text-dark-primary mb-4 w-full">
        Your status:
      </h2>
      <div class="flex gap-8 justify-between flex-wrap">
        <snapshot-card
          v-for="snapshot of snapshots"
          :key="snapshot.lender_account.id"
          :snapshot="snapshot"
        />
        <div v-if="!snapshots?.length" class="">No snapshots</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 w-full fixed bottom-0 left-0 py-4 px-4">
      <m-button
        v-if="selectedAccount"
        class="border border-mid-primary text-mid-primary mx-auto w-full"
        @click="goToCreatePaymentPage"
      >
        New Payment
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
        New Cost
      </m-button>
      <m-button
        v-if="selectedAccount"
        class="border border-mid-gray text-mid-gray mx-auto w-full"
        @click="clearSelectedAccount"
      >
        Logout
      </m-button>
      <m-button
        class="bg-dark-gray text-white mx-auto w-full"
        :class="{ 'col-span-2': !selectedAccount }"
        @click="goToCreateAccountPage"
      >
        Create Account
      </m-button>
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

const mainStore = useMainStore();

const selectedAccount = computed(() => mainStore.selectedAccount);

const snapshots = computed(() =>
  mainStore.filteredSnapshots(selectedAccount.value)
);

const router = useRouter();
function goToCreateCostPage() {
  router.push(routePaths.createCostPage);
}

function goToCreatePaymentPage() {
  router.push(routePaths.createPaymentPage);
}

function goToCreateAccountPage() {
  router.push(routePaths.createAccountPage);
}

function clearSelectedAccount(): void {
  mainStore.selectedAccount = undefined;
}
</script>
