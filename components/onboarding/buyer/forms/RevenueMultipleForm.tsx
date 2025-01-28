import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerRevenueMultipleStepAction } from "@/app/actions";

export function RevenueMultipleForm() {
  return (
    <PreferenceForm
      action={CreateBuyerRevenueMultipleStepAction}
      label="What RevenueMultiple business are you interested in?"
      options={[
        {
          value: "RevenueMultipleCharts",
          label: "Small - Less than 10 employees",
        },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
