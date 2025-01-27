import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerMaturityStepAction } from "@/app/actions";

export function MaturityForm() {
  return (
    <PreferenceForm
      action={CreateBuyerMaturityStepAction}
      label="What current maturity trajectory are you interested in?"
      options={[
        { value: "startup", label: "Startup" },
        { value: "growing", label: "Growing" },
        { value: "established", label: "Established" },
      ]}
    />
  );
}
