import { createChartData, getTrailingProfit } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingProfitStepAction } from "@/app/actions";

export async function TrailingProfitForm() {
  const trailingProfitArr = await getTrailingProfit();

  const chartData = createChartData(trailingProfitArr, 20000, 10);

  return (
    <PreferenceForm
      action={CreateBuyerTrailingProfitStepAction}
      label="What TrailingProfit business are you interested in?"
      chartData={chartData}
      chartName="12 Month Trailing Profit"
      chartMax="$200k"
    />
  );
}
