import { defineStore } from "pinia";
import Account from "~/interfaces/account";
import Snapshot from "./../interfaces/snapshot";

interface MainState {
  accounts: Account[];
  snapshots: Snapshot[];
  selectedAccount?: Account;
  costs: [];
  payments: [];
}

export const useMainStore = defineStore("Main", {
  state: (): MainState => {
    return {
      accounts: [],
      snapshots: [],
      selectedAccount: undefined,
      costs: [],
      payments: [],
    };
  },
  actions: {
    async loadAccounts() {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/account`);
      return result.json();
    },
    async loadSnapshots() {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/snapshot`);
      return result.json();
    },
    async loadCosts() {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/cost`);
      return result.json();
    },
    async loadPayments() {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/payment`);
      return result.json();
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
        console.log(list);
        return list;
      };
    },
  },
});
