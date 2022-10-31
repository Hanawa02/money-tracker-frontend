import Account from "./account";

export default interface Snapshot {
  payer_account: Account;
  lender_account: Account;
  amount: number;
}
