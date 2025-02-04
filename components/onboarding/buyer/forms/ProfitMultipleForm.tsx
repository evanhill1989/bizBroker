import { createChartData, getProfitMultiples } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerProfitMultipleStepAction } from "@/app/utils/actions/actions";

export async function ProfitMultipleForm() {
  const profitMultipleArr = await getProfitMultiples();

  const chartData = createChartData(profitMultipleArr, 1, 10);

  return (
    <PreferenceForm
      action={CreateBuyerProfitMultipleStepAction}
      label="What ProfitMultiple business are you interested in?"
      chartData={chartData}
      chartName="Profit Multiples"
      chartMax="10"
      formType="profitMultiple"
    />
  );
}
