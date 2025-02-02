import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerPriceRangeStepAction } from "@/app/actions";
import { getListingPrices, createChartData } from "@/app/utils/chartUtils";
import { PriceRangeFormSchema } from "@/app/utils/zodSchemas";

export async function PriceRangeForm() {
  const pricesArr = await getListingPrices();

  const chartData = createChartData(pricesArr, 50000, 10);

  console.log(chartData, "<!------------------chartObject in PriceRangeForm");

  return (
    <PreferenceForm
      action={CreateBuyerPriceRangeStepAction}
      label="What is your ideal price range?"
      chartData={chartData}
      chartName="Price Range"
      chartMax="$500k"
      formType="priceRange"
      // zodSchema={PriceRangeFormSchema}
    />
  );
}
