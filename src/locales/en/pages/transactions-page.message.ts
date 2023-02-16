import TransactionsPage from "~/locales/interfaces/pages/transactions-page.interface";

const transactionpage: TransactionsPage = {
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
  paymentCard: {
    fullDescription: "<span class='underline'>{from}</span> paid to <span class='underline'>{to}</span>: {description}",
  },
  goBackButton: "Go back",
};

export default transactionpage;
