<template>
  <div class="p-4 max-w-md mx-auto">
    <account-selector
      label="Payer"
      @change="updatePayer"
      :selectedAccountId="payer?.id"
      class="mb-4"
    ></account-selector>
    <div class="flex mb-4">
      <label class="pr-2">Date:</label>
      <input
        type="date"
        v-model="eventDate"
        class="border-b w-full text-center"
      />
    </div>
    <div class="flex mb-4">
      <label class="pr-2">Description:</label>
      <input
        type="text"
        v-model="description"
        class="border-b w-full text-center"
      />
    </div>
    <div class="flex mb-4">
      <label class="pr-2">Amount:</label>
      <input
        type="number"
        v-model="amount"
        class="border-b w-full text-center"
      />
    </div>
    <div class="flex mb-8">
      <label class="pr-2">Tags (separated by comma):</label>
      <input type="text" v-model="tags" class="border-b w-full text-center" />
    </div>

    <div class="flex flex-col justify-center mb-8">
      <button
        @click="addDebtor"
        class="
          bg-gray
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
      >
        Add another Debtor
      </button>
      <div
        v-for="debtor of debtors"
        :key="debtor.accountId"
        class="shadow-card p-2 rounded mb-4"
      >
        <account-selector
          label="Debtor"
          @change="(newValue) => (debtor.accountId = newValue)"
          :selectedAccountId="debtor.accountId"
        ></account-selector>

        <div class="flex mb-4">
          <label class="pr-2">Percentage:</label>
          <input
            type="number"
            max="100"
            v-model="debtor.percentage"
            class="border-b"
          />
        </div>
      </div>
    </div>
    <button
      @click="addCost"
      class="bg-red text-white px-4 py-3 rounded text-md font-medium w-full"
    >
      Add Cost
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMainStore } from "~/stores/main.store";
import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import Account from "~/interfaces/account";
import AccountSelector from "~/components/AccountSelector.vue";
import { useDateFormat } from "@vueuse/core";

const mainStore = useMainStore();

mainStore.loadData();

const payer = ref<Account | undefined>(undefined);
const amount = ref<number>(0);
const description = ref<string>("");
const tags = ref<string>("");
const eventDate = ref<Date>(new Date());

const debtors = ref<{ accountId: string; percentage: number }[]>([]);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function updatePayer(id: string) {
  payer.value = mainStore.getAccountById(id);
  debtors.value.push({
    accountId: payer.value?.id || "",
    percentage: 0,
  });
}

function addDebtor() {
  debtors.value.push({
    accountId: "",
    percentage: 0,
  });
}

function addCost() {
  const payload = {
    method: "POST",
    data: {
      debtors: debtors.value,
      amount: amount.value,
      description: description.value,
      tags: tags.value.split(",").map((item) => item.trim()),
      event_date: useDateFormat(eventDate, "YYYY-MM-DD").value,
    },
  };

  const { data, isFinished } = useAxios(
    `account/${payer.value?.id}/cost`,
    payload,
    instance
  );

  console.log(data, isFinished);
}
</script>
