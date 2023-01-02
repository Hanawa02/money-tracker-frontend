import Debtor from "~/interfaces/debtor";
export default interface Cost {
  discriminator: "Cost";
  id: string;
  account_id: string;
  description: string;
  event_date: string;
  amount: number;
  tags: string[];
  debtors: Debtor[];
}
