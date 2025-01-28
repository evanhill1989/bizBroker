import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerProfitMultipleStepAction } from "@/app/actions";

export function ProfitMultipleForm() {
  return (
    <PreferenceForm
      action={CreateBuyerProfitMultipleStepAction}
      label="What ProfitMultiple business are you interested in?"
      options={[
        {
          value: "ProfitMultiple charts",
          label: "Small - Less than 10 employees",
        },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
