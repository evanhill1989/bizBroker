import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerPriceRangeStepAction } from "@/app/actions";

export function PriceRangeForm() {
  // charts
  return (
    <PreferenceForm
      action={CreateBuyerPriceRangeStepAction}
      label="What is your ideal price range?"
      options={[
        { value: "PriceRangeChart", label: "Small - Less than 10 employees" },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
