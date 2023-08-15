import axios, { AxiosResponse } from "axios";
import { RemovableRef, useDateFormat } from "@vueuse/core";
import { useAxios, StrictUseAxiosReturn } from "@vueuse/integrations/useAxios";
import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

import Account from "~/interfaces/account";
import Snapshot from "~/interfaces/snapshot";
import Debtor from "~/interfaces/debtor";
import Payment from "~/interfaces/payment";
import Cost from "~/interfaces/cost";

import { useStorage } from "@vueuse/core";

interface MainState {
  accounts: Account[];
  snapshots: Snapshot[];
  selectedAccountId?: RemovableRef<string>;
  costs: Cost[];
  payments: Payment[];
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
      this.accounts = result.data;
    },
    async loadSnapshots() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/snapshot`);
      this.snapshots = result.data;
    },
    async loadCosts() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/cost`);
      this.costs = result.data.map((item: Cost) => {
        return { ...item, discriminator: "Cost" };
      });
    },
    async loadPayments() {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
      this.payments = result.data.map((item: Payment) => {
        return { ...item, discriminator: "Payment" };
      });
    },
    async loadTags() {
      if (this.selectedAccount) {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/account/${this.selectedAccount.id}/tags`);

        this.tags = result.data;
      }
    },
    loadData() {
      Promise.all([this.loadAccounts(), this.loadSnapshots(), this.loadCosts(), this.loadPayments(), this.loadTags()]);
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
      const { payerId, description, amount, eventDate, debtors, tags } = payload;

      const requestPayload = {
        method: "POST",
        data: {
          debtors: debtors.map((d) => ({
            account_id: d.account_id,
            amount: d.amount,
          })),
          amount: amount,
          description: description,
          tags: tags,
          event_date: useDateFormat(eventDate, "YYYY-MM-DD").value,
        },
      };

      const authStore = useAuthStore();

      const result = await useAxios(`account/${payerId}/cost`, requestPayload, authStore.axiosInstance);

      return result;
    },
    async deleteCost(payload: {
      account_id: string;
      id: string;
    }): Promise<StrictUseAxiosReturn<any, AxiosResponse<any>, any>> {
      const { account_id, id } = payload;

      const requestPayload = {
        method: "DELETE",
      };

      const authStore = useAuthStore();

      const result = await useAxios(`account/${account_id}/cost/${id}`, requestPayload, authStore.axiosInstance);

      return result;
    },
  },
  getters: {
    selectedAccount(): Account | undefined {
      return this.accounts.find((item) => item.id === this.selectedAccountId);
    },
    filteredSnapshots(state) {
      return (selectedAccount: Account | undefined): Snapshot[] => {
        if (!selectedAccount) {
          return state.snapshots;
        }

        const includesSelectedAccount = (item: Snapshot): boolean => item.payer_account.id === selectedAccount?.id;
        const haveAmountToPayOrReceive = (item: Snapshot): boolean => item.amount !== 0.0;
        const list = state.snapshots.filter(includesSelectedAccount).filter(haveAmountToPayOrReceive);

        return list;
      };
    },
    getAccountById(state) {
      return (id: string): Account | undefined => state.accounts.find((item) => item.id === id);
    },
    monthlyCosts(state) {
      const monthlyCosts: { [key: string]: { month: string; items: { tag: string; value: number }[] } } = {};

      state.costs.forEach((cost) => {
        const month = useDateFormat(cost.event_date, "YYYY-MM").value;
        const tags = cost.tags?.length > 0 ? cost.tags : ["untagged"];

        tags.forEach((tag) => {
          if (monthlyCosts[month]) {
            const index = monthlyCosts[month].items.findIndex((item) => item.tag === tag);

            if (index === -1) {
              monthlyCosts[month].items.push({ tag: tag, value: cost.amount });
            } else {
              monthlyCosts[month].items[index].value += cost.amount;
            }
          } else {
            monthlyCosts[month] = {
              month: month,
              items: [{ tag: tag, value: cost.amount }],
            };
          }
        });
      });

      return Object.values(monthlyCosts).sort((a, b) => {
        const aDateParts = a.month.split("-");
        const bDateParts = b.month.split("-");

        if (aDateParts[0] === bDateParts[0]) {
          return parseInt(bDateParts[1]) - parseInt(aDateParts[1]);
        }
        return parseInt(bDateParts[0]) - parseInt(aDateParts[0]);
      });
    },
  },
});
