export default interface Payment {
  discriminator: "Payment";
  amount: number;
  description: string;
  event_date: string;
  id: string;
  lender_account_id: string;
  payer_account_id: string;
}
