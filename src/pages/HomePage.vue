<template>
  <div class="p-4">
    <template v-if="!selectedAccount">
      <div
        class="
          relative
          flex
          items-center
          mb-4
          px-3
          py-2
          border-extra-light-primary border
          rounded
        "
      >
        <search-icon
          class="w-6 h-6 text-primary flex-shrink-0 outline-none z-10"
        />
        <input
          type="text"
          placeholder="search"
          class="w-full absolute pl-10 pr-3 h-full left-0"
        />
      </div>

      <div
        v-for="account of accounts"
        class="
          flex
          items-center
          gap-x-2
          px-3
          py-2
          border-primary border
          rounded
          mb-2
          last:mb-0
        "
        @click="updateSelectedAccount(account.id)"
      >
        <person-icon class="text-primary w-6 h-6" />
        <span class="font-medium text-md">{{ account.name }}</span>
      </div>
    </template>

    <div
      v-if="selectedAccount"
      class="flex gap-8 justify-between flex-wrap mb-8"
    >
      <div
        v-for="snapshot of snapshots"
        :key="snapshot.lender_account.id"
        class="p-4 shadow-card rounded-md flex flex-col min-w-32 text-center"
      >
        <label
          class="font-medium mb-1 text-mid-gray"
          :class="selectedAccount ? 'text-lg' : 'text-md'"
        >
          <span v-if="!selectedAccount">
            {{ snapshot.payer_account.name }} ->
          </span>
          {{ snapshot.lender_account.name }}
        </label>
        <div
          :class="`${snapshot.amount < 0 ? 'text-red' : 'text-mid-primary'}`"
        >
          {{ snapshot.amount }}
        </div>
      </div>
      <div v-if="!snapshots?.length" class="">No snapshots</div>
    </div>

    <button
      v-if="selectedAccount"
      class="
        bg-dark-red
        text-white
        px-4
        py-3
        rounded
        text-md
        font-medium
        mx-auto
        w-full
        mb-4
      "
      @click="goToCreateCostPage"
    >
      Create Cost
    </button>
    <button
      v-if="selectedAccount"
      class="
        bg-dark-primary
        text-white
        px-4
        py-3
        rounded
        text-md
        font-medium
        mx-auto
        w-full
        mb-4
      "
      @click="goToCreatePaymentPage"
    >
      Create Payment
    </button>
    <button
      class="
        bg-dark-primary
        text-white
        px-4
        py-3
        rounded
        text-md
        font-medium
        mx-auto
        w-full
        mb-4
      "
      @click="goToCreateAccountPage"
    >
      Create Account
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";

import { useRouter } from "vue-router";
import routePaths from "~/routes/paths";

import PersonIcon from "~/components/Icons/PersonIcon.vue";
import SearchIcon from "~/components/Icons/SearchIcon.vue";

const mainStore = useMainStore();

const selectedAccount = computed(() => mainStore.selectedAccount);

function updateSelectedAccount(accountId: string) {
  mainStore.selectedAccount = mainStore.accounts.find(
    (item) => item.id === accountId
  );
}

const accounts = computed(() => mainStore.accounts);
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
</script>
