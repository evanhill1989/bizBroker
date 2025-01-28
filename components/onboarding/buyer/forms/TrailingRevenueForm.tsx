import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingRevenueStepAction } from "@/app/actions";

export function TrailingRevenueForm() {
  return (
    <PreferenceForm
      action={CreateBuyerTrailingRevenueStepAction}
      label="What TrailingRevenue business are you interested in?"
      options={[
        {
          value: "TrailingRevenueCharts",
          label: "Small - Less than 10 employees",
        },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
