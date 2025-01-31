import { createChartData, getTrailingProfit } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingProfitStepAction } from "@/app/actions";

export async function TrailingProfitForm() {
  const trailingProfitArr = await getTrailingProfit();

  const chartData = createChartData(trailingProfitArr, 20000, 10);
  const chartRanges = [
    "$0 - $20k",
    "$20k - $40k",
    "$40k - $60k",
    "$60k - $80k",
    "$80k - $100k",
    "$100k - $120k",
    "$120k - $140k",
    "$140k - $160k",
    "$160k - $180k",
    "$180k - $200k",
  ];

  return (
    <PreferenceForm
      action={CreateBuyerTrailingProfitStepAction}
      label="What TrailingProfit business are you interested in?"
      chartData={chartData}
      chartName="12 Month Trailing Profit"
      chartRanges={chartRanges}
    />
  );
}
