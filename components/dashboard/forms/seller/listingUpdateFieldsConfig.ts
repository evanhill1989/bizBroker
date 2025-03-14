export const fieldsConfig = [
  {
    label: "Price",
    name: fields.price.name,
    placeholder: "Price",
    type: "number",
    error: fields.price.errors,
  },
  {
    label: "Profit Multiple",
    name: fields.profitMultiple.name,
    placeholder: "Profit Multiple",
    error: fields.profitMultiple.errors,
  },
  {
    label: "Revenue Multiple",
    name: fields.revenueMultiple.name,
    placeholder: "0",
    error: fields.revenueMultiple.errors,
  },
  {
    label: "Trailing 12 month profit",
    name: fields.trailing12MonthProfit.name,
    placeholder: "0",
    error: fields.trailing12MonthProfit.errors,
  },
  {
    label: "Trailing 12 month revenue",
    name: fields.trailing12MonthRevenue.name,
    placeholder: "0",
    error: fields.trailing12MonthRevenue.errors,
  },
  {
    label: "Last month revenue",
    name: fields.lastMonthRevenue.name,
    placeholder: "0",
    error: fields.lastMonthRevenue.errors,
  },
  {
    label: "Last month profit",
    name: fields.lastMonthProfit.name,
    placeholder: "0",
    error: fields.lastMonthProfit.errors,
  },
];
