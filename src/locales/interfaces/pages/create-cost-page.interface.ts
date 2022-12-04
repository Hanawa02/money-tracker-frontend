export default interface CreateCostPage {
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
  addCostButton: string;
  cancelButton: string;
  tagInput: {
    label: string;
  };
  percentageInput: {
    label: string;
  };
}
