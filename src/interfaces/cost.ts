export default interface Cost {
  discriminator: "Cost";
  id: string;
  account_id: string;
  description: string;
  event_date: string;
  amount: number;
  tags: ["string"];
}
