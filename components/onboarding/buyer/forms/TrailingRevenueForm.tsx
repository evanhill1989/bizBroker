import { createChartData, getTrailingRevenue } from "@/app/utils/chartUtils";
import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerTrailingRevenueStepAction } from "@/app/utils/actions/actions";

export async function TrailingRevenueForm() {
  const trailingRevenueArr = await getTrailingRevenue();

  const chartData = createChartData(trailingRevenueArr, 100000, 10);

  return (
    <PreferenceForm
      action={CreateBuyerTrailingRevenueStepAction}
      label="What TrailingRevenue business are you interested in?"
      chartData={chartData}
      chartName="12 Month Trailing Revenue"
      chartMax="$1Mil"
      formType="trailingRevenue"
    />
  );
}
