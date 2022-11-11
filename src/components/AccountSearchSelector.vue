<template>
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
    <search-icon class="w-6 h-6 text-primary flex-shrink-0 outline-none z-10" />
    <input
      type="text"
      placeholder="search"
      class="w-full absolute pl-10 pr-3 h-full left-0"
      v-model="searchInput"
    />
  </div>

  <div
    v-for="account of first5Accounts"
    class="
      flex
      items-center
      gap-x-2
      px-3
      py-2
      border-primary border
      rounded
      mb-2
      cursor-pointer
    "
    @click="updateSelectedAccount(account.id)"
  >
    <person-icon class="text-primary w-6 h-6" />
    <span class="font-medium text-md">{{ account.name }}</span>
  </div>

  <div
    class="text-mid-gray text-sm font-medium my-2"
    v-if="notDisplayedAccountsNumber > 0"
  >
    {{ notDisplayedAccountsNumber }} accounts are not displayed.
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";

import PersonIcon from "~/components/Icons/PersonIcon.vue";
import SearchIcon from "~/components/Icons/SearchIcon.vue";
import Account from "~/interfaces/account";

const mainStore = useMainStore();

const selectedAccount = computed(() => mainStore.selectedAccount);

function updateSelectedAccount(accountId: string) {
  mainStore.selectedAccount = mainStore.accounts.find(
    (item) => item.id === accountId
  );
}

const snapshots = computed(() =>
  mainStore.filteredSnapshots(selectedAccount.value)
);

const searchInput = ref("");
const allAccounts = computed<Account[]>((): Account[] => mainStore.accounts);
const accounts = computed<Account[]>((): Account[] => {
  if (searchInput) {
    return allAccounts.value.filter((account) =>
      account.name
        .toLocaleLowerCase()
        .includes(searchInput.value.toLocaleLowerCase())
    );
  }

  return allAccounts.value;
});

const first5Accounts = computed(() => accounts.value.slice(0, 5));
const notDisplayedAccountsNumber = computed(
  () => accounts.value.length - first5Accounts.value.length
);
</script>
