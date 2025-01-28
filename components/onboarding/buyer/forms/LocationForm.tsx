import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerLocationStepAction } from "@/app/actions";

export function LocationForm() {
  return (
    <PreferenceForm
      action={CreateBuyerLocationStepAction}
      label="What Location business are you interested in?"
      options={[
        { value: "florida", label: "Florida" },
        { value: "outsideFlorida", label: "Not Florida" },
      ]}
    />
  );
}
