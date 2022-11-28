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
      const result = await fetch(`${import.meta.env.VITE_API_URL}/account`, {
        headers: {
          Authorization:
            "Bearer 74suBHPaUWi/P/G/wRbutj5X6XbhYnUXGEuxXzHbsMotemHOryibF6atvyZOj8ULyeAjV8Ce1S0ZXE2XaHTuSQ==",
        },
      });
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
      // const [accounts, snapshots, costs, payments] = await Promise.all([
      //   this.loadAccounts(),
      //   this.loadSnapshots(),
      //   this.loadCosts(),
      //   this.loadPayments(),
      // ]);
      this.loadAccounts();

      const lauraAccount = { id: "2", name: "Laura" };
      const niklasAccount = { id: "1", name: "Niklas" };

      this.accounts = [niklasAccount, lauraAccount]; // accounts;
      this.snapshots = [
        {
          payer_account: lauraAccount,
          lender_account: niklasAccount,
          amount: 2.28,
        },
        {
          payer_account: niklasAccount,
          lender_account: lauraAccount,
          amount: -2.28,
        },
      ]; //snapshots;
      this.costs = [];
      this.payments = [];
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
    getAccountById(state) {
      return (id: string) => state.accounts.find((item) => item.id === id);
    },
  },
});
