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
    sortedCosts(state) {
      return state.costs.sort((a, b) => {
        return a.event_date < b.event_date ? 1 : -1; // latest costs first
      });
    },
    monthlyCosts() {
      const monthlyCosts: { [key: string]: { month: string; items: { tag: string; value: number }[] } } = {};

      this.sortedCosts.forEach((cost) => {
        const month = useDateFormat(cost.event_date, "YYYY-MM").value;
        const tags = cost.tags?.length > 0 ? cost.tags : ["untagged"];

        tags.forEach((tag) => {
          const amount = cost.debtors.find((debtor) => debtor.account_id === this.selectedAccountId)?.amount;
          if (monthlyCosts[month]) {
            const index = monthlyCosts[month].items.findIndex((item) => item.tag === tag);

            if (index === -1) {
              monthlyCosts[month].items.push({ tag: tag, value: amount });
            } else {
              monthlyCosts[month].items[index].value += amount;
            }
          } else {
            monthlyCosts[month] = {
              month: month,
              items: [{ tag: tag, value: amount }],
            };
          }
        });
      });

      return monthlyCosts;
    },
    averageMonthlyCostsPerTag() {
      const aggregatedData: {
        [key: string]: {
          value: number;
          months: string[];
        };
      } = {};

      this.sortedCosts.forEach((cost) => {
        const month = useDateFormat(cost.event_date, "YYYY-MM").value;
        const tags = cost.tags?.length > 0 ? cost.tags : ["untagged"];

        tags.forEach((tag) => {
          const amount = cost.debtors.find((debtor) => debtor.account_id === this.selectedAccountId)?.amount;

          if (aggregatedData[tag]) {
            aggregatedData[tag].value += amount;
            aggregatedData[tag].months.push(month);
          } else {
            aggregatedData[tag] = {
              value: amount,
              months: [month],
            };
          }
        });
      });

      const averages = Object.entries(aggregatedData).map(([key, value]) => {
        const monthCount = [...new Set(value.months)].length;
        return {
          tag: key,
          value: value.value / monthCount,
        };
      });

      return averages;
    },
  },
});
