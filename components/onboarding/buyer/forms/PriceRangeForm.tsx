import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerPriceRangeStepAction } from "@/app/actions";
import { getListingPrices, createChartData } from "@/app/utils/chartUtils";

export async function PriceRangeForm() {
  const pricesArr = await getListingPrices();

  const chartData = createChartData(pricesArr, 50000, 10);

  const chartRanges = [
    "$0 - $50k",
    "$50k - $100k",
    "$100k - $150k",
    "$150k - $200k",
    "$200k - $250k",
    "$250k - $300k",
    "$300k - $350k",
    "$350k - $400k",
    "$400k - $450k",
    "$450k - $500k",
  ];

  console.log(chartData, "<!------------------chartObject in PriceRangeForm");

  return (
    <PreferenceForm
      action={CreateBuyerPriceRangeStepAction}
      label="What is your ideal price range?"
      chartData={chartData}
      chartName="Price Range"
      chartRanges={chartRanges}
    />
  );
}
