import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingProfitStepAction } from "@/app/actions";

export function TrailingProfitForm() {
  return (
    <PreferenceForm
      action={CreateBuyerTrailingProfitStepAction}
      label="What TrailingProfit business are you interested in?"
      options={[
        {
          value: "TrailngProfitCharts",
          label: "Small - Less than 10 employees",
        },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
