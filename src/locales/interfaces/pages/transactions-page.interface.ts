export default interface TransactionsPage {
  title: string;
  header: string;
  filterByAccount: string;
  searchFilter: {
    label: string;
    placeholder: string;
  };
  transactionTypeFilter: {
    label: string;
    optionLabels: {
      all: string;
      cost: string;
      payment: string;
    };
  };
  paymentCard: {
    fullDescription: string;
  };
  goBackButton: string;
}
