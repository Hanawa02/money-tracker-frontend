import Account from "~/interfaces/account";

export default interface Payment {
  amount: number;
  description: string;
  event_date: string;
  id: string;
  lender_account_id: string;
  payer_account_id: string;
}
