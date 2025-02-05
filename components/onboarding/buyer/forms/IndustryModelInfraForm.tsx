import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerIndustryModelInfraStepAction } from "@/app/utils/actions/onboardingActions";

export function IndustryModelInfraForm() {
  return (
    <PreferenceForm
      action={CreateBuyerIndustryModelInfraStepAction}
      label="What IndustryModelInfra business are you interested in?"
      options={[
        { value: "retail", label: "Retail" },
        { value: "b2b", label: "Business to Business" },
        { value: "online", label: "Virtual Storefront" },
      ]}
    />
  );
}
