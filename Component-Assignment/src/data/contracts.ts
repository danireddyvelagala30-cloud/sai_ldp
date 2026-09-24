export type Contract = {
  id: number;
  name: string;
  billingCycle: string;
  amount: number;
  selected: boolean;
};

export const contracts: Contract[] = [
  { id: 1, name: "Contract 1", billingCycle: "Monthly", amount: 12000, selected: true },
  { id: 2, name: "Contract 2", billingCycle: "Quarterly", amount: 18000, selected: false },
  { id: 3, name: "Contract 3", billingCycle: "Yearly", amount: 35000, selected: true },
  { id: 4, name: "Contract 4", billingCycle: "Monthly", amount: 21000, selected: false },
];

export const summaryDetails = {
  title: "Summary",
  term: "12 Months",
  reviewButtonLabel: "Review Your Credit",
};
