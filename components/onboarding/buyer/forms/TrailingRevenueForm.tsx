import { createChartData, getTrailingRevenue } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingRevenueStepAction } from "@/app/actions";

export async function TrailingRevenueForm() {
  const trailingRevenueArr = await getTrailingRevenue();

  const chartData = createChartData(trailingRevenueArr, 100000, 10);
  const chartRanges = [
    "$0 - $100k",
    "$100k - $200k",
    "$200k - $300k",
    "$300k - $400k",
    "$400k - $500k",
    "$500k - $600k",
    "$600k - $700k",
    "$700k - $800k",
    "$800k - $900k",
    "$900k - $1M",
  ];

  return (
    <PreferenceForm
      action={CreateBuyerTrailingRevenueStepAction}
      label="What TrailingRevenue business are you interested in?"
      chartData={chartData}
      chartName="12 Month Trailing Revenue"
      chartRanges={chartRanges}
    />
  );
}
