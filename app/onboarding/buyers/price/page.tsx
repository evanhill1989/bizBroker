import { getListingPrices, createChartData } from "@/app/utils/chartUtils";

import { PriceRangeForm } from "@/components/onboarding/buyer/forms/PriceRangeForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function BuyerPriceRangePage() {
  const pricesArr = await getListingPrices();

  const chartData = createChartData(pricesArr, 50000, 10);

  return (
    <>
      <Card className="m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your target price range?</CardTitle>
          <CardDescription>
            Choose the the type that most accurately represents the majority of
            your revenue streams
          </CardDescription>
        </CardHeader>
        <PriceRangeForm chartData={chartData} />
      </Card>
    </>
  );
}
