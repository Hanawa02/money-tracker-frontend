export default interface TransactionsPage {
  title: string;
  header: string;
  filterByAccount: string;
  searchFilter: {
    label: string;
    placeholder: string;
  };
  goBackButton: string;
}
