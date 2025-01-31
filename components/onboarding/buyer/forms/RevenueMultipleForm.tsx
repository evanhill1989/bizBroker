import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerRevenueMultipleStepAction } from "@/app/actions";
import { createChartData, getRevenueMultiples } from "@/app/utils/chartUtils";

export async function RevenueMultipleForm() {
  const revMultiplesArr = await getRevenueMultiples();

  const chartData = createChartData(revMultiplesArr, 1, 10);
  const chartRanges = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  console.log(
    chartData,
    "<!------------------chartObject in RevenueMultipleForm"
  );

  return (
    <PreferenceForm
      action={CreateBuyerRevenueMultipleStepAction}
      label="What RevenueMultiple business are you interested in?"
      chartData={chartData}
      chartName="Revenue Multiple"
      chartRanges={chartRanges}
    />
  );
}
