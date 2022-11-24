import CreatePaymentPage from "~/locales/interfaces/pages/create-payment-page.interface";

const createPayment: CreatePaymentPage = {
  title: "Create Payment",
  header: "Create new payment",
  addPaymentButton: "Add Payment",
  cancelButton: "Cancel",
  amountInput: {
    label: "Amount",
  },
  dateInput: {
    label: "Date",
  },
  descriptionInput: {
    label: "Description",
    placeholder: "Identify your payment",
  },
};

export default createPayment;
