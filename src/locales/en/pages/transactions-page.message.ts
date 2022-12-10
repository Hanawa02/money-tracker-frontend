import TransactionsPage from "~/locales/interfaces/pages/transactions-page.interface";

const login: TransactionsPage = {
  title: "Transactions - Money Tracker",
  header: "Transactions List",
  filterByAccount: "Filter by Account",
  searchFilter: {
    label: "Search",
    placeholder: "Search by description or amount",
  },
  transactionTypeFilter: {
    label: "Filter by transaction type",
    optionLabels: {
      all: "All",
      cost: "Only costs",
      payment: "Only Payments",
    },
  },
  goBackButton: "Go back",
};

export default login;
