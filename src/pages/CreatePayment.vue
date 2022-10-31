<template>
  <div class="p-4">
    <div class="p-3 text-lg flex mb-8">
      <label class="flex-shrink-0 font-bold pr-2">Filter for account:</label>
      <select
        name="account"
        :value="selectedAccount?.id"
        @change="updateSelectedAccount"
        class="w-full text-center"
      >
        <option value="">None</option>
        <option
          v-for="account of accounts"
          :key="account.id"
          :value="account.id"
        >
          {{ account.name }}
        </option>
      </select>
    </div>
    <div class="flex gap-8 justify-between flex-wrap">
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
        <div :class="`${snapshot.amount < 0 ? 'text-red' : 'text-mid-green'}`">
          {{ snapshot.amount }}
        </div>
      </div>
      <div v-if="!snapshots?.length" class="">No snapshots</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();

mainStore.loadData();

const selectedAccount = computed(() => mainStore.selectedAccount);

function updateSelectedAccount(event: Event) {
  const newValue = (event?.target as HTMLSelectElement).value;
  console.log(newValue);

  if (newValue !== selectedAccount.value?.id) {
    mainStore.selectedAccount = mainStore.accounts.find(
      (item) => item.id === newValue
    );
  }
}
const accounts = computed(() => mainStore.accounts);
const snapshots = computed(() =>
  mainStore.filteredSnapshots(selectedAccount.value)
);
</script>
