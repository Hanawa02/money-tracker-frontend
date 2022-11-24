export default interface CreatePaymentPage {
  title: string;
  header: string;
  dateInput: { label: string };
  descriptionInput: {
    label: string;
    placeholder: string;
  };
  amountInput: {
    label: string;
  };
  addPaymentButton: string;
  cancelButton: string;
}
