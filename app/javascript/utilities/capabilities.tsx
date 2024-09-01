export const capabilityChoices = [
  {
    label: "Transfers",
    value: "transfers",
  },
  {
    label: "Card payments",
    value: "card_payments",
  },
  {
    label: "Card issuing",
    value: "card_issuing",
  },
  {
    label: "ACH payments",
    value: "us_bank_account_ach_payments",
  },
  {
    label: "Tax Reporting US 1099 K",
    value: "tax_reporting_us_1099_k",
  },
  {
    label: "Tax Reporting US 1099 Misc",
    value: "tax_reporting_us_1099_misc",
  },
];

export const capabilityReducer = (acc, cap) => {
  return {
    ...acc,
    [cap]: { requested: true },
  };
};
