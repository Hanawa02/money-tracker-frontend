import { defineStore } from "pinia";
import Account from "~/interfaces/account";
import Snapshot from "./../interfaces/snapshot";
import axios from "axios";

interface MainState {
  accounts: Account[];
  snapshots: Snapshot[];
  selectedAccount?: Account;
  costs: [];
  payments: [];
  tags: string[];
}

export const useMainStore = defineStore("Main", {
  state: (): MainState => {
    return {
      accounts: [],
      snapshots: [],
      selectedAccount: undefined,
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
      this.selectedAccount = this.accounts.find(
        (item) => item.id === accountId
      );
    },
  },
  getters: {
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
