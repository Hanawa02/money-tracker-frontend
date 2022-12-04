import CreateCostPage from "~/locales/interfaces/pages/create-cost-page.interface";

const createCost: CreateCostPage = {
  title: "Create Cost",
  header: "Create new cost",
  addCostButton: "Add Cost",
  cancelButton: "Cancel",
  amountInput: {
    label: "Amount",
  },
  dateInput: {
    label: "Date",
  },
  descriptionInput: {
    label: "Description",
    placeholder: "Identify your cost",
  },
};

export default createCost;
