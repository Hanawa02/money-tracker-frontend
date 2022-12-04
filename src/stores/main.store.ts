import axios, { AxiosResponse } from "axios";
import { RemovableRef, useDateFormat } from "@vueuse/core";
import { useAxios, StrictUseAxiosReturn } from "@vueuse/integrations/useAxios";
import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

import Account from "~/interfaces/account";
import Snapshot from "~/interfaces/snapshot";
import Debtor from "~/interfaces/debtor";

import { useStorage } from "@vueuse/core";

interface MainState {
  accounts: Account[];
  snapshots: Snapshot[];
  selectedAccountId?: RemovableRef<string>;
  costs: [];
  payments: [];
  tags: string[];
}

export const useMainStore = defineStore("Main", {
  state: (): MainState => {
    return {
      accounts: [],
      snapshots: [],
      selectedAccountId: useStorage("selectedAccountId", ""),
      costs: [],
      payments: [],
      tags: [],
    };
  },
  actions: {
    async loadAccounts() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/account`);
      return result.data;
    },
    async loadSnapshots() {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/snapshot`
      );
      return result.data;
    },
    async loadCosts() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/cost`);
      return result.data;
    },
    async loadPayments() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
      return result.data;
    },
    async loadTags() {
      if (this.selectedAccount) {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/${
            this.selectedAccount.id
          }/tags`
        );

        this.tags = result.data;
      }
    },
    async loadData() {
      const [accounts, snapshots, costs, payments] = await Promise.all([
        this.loadAccounts(),
        this.loadSnapshots(),
        this.loadCosts(),
        this.loadPayments(),
      ]);

      this.accounts = accounts;
      this.snapshots = snapshots;
      this.costs = costs;
      this.payments = payments;
    },
    async selectAccount(accountId: string) {
      this.selectedAccountId = accountId;
    },
    async addCost(payload: {
      payerId: string;
      description: string;
      amount: number;
      eventDate: Date;
      debtors: Debtor[];
      tags: string[];
    }): Promise<StrictUseAxiosReturn<any, AxiosResponse<any>, any>> {
      const { payerId, description, amount, eventDate, debtors, tags } =
        payload;

      const requestPayload = {
        method: "POST",
        data: {
          debtors: debtors.map((d) => ({
            account_id: d.accountId,
            percentage: d.percentage,
          })),
          amount: amount,
          description: description,
          tags: tags,
          event_date: useDateFormat(eventDate, "YYYY-MM-DD").value,
        },
      };

      const authStore = useAuthStore();

      const result = await useAxios(
        `account/${payerId}/cost`,
        requestPayload,
        authStore.axiosInstance
      );

      return result;
    },
  },
  getters: {
    selectedAccount(): Account | undefined {
      return this.accounts.find((item) => item.id === this.selectedAccountId);
    },
    filteredSnapshots(state) {
      return (selectedAccount: Account | undefined) => {
        if (!selectedAccount) {
          return state.snapshots;
        }

        const list = state.snapshots.filter(
          (item) => item.payer_account.id === selectedAccount?.id
        );

        return list;
      };
    },
    getAccountById(state) {
      return (id: string) => state.accounts.find((item) => item.id === id);
    },
  },
});
