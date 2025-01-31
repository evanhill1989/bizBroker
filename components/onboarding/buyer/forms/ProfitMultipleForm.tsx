import { createChartData, getProfitMultiples } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerProfitMultipleStepAction } from "@/app/actions";

export async function ProfitMultipleForm() {
  const profitMultipleArr = await getProfitMultiples();

  const chartData = createChartData(profitMultipleArr, 1, 10);
  const chartRanges = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <PreferenceForm
      action={CreateBuyerProfitMultipleStepAction}
      label="What ProfitMultiple business are you interested in?"
      chartData={chartData}
      chartName="Profit Multiples"
      chartRanges={chartRanges}
    />
  );
}
