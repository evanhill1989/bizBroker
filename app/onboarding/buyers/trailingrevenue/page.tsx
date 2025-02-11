import { createChartData, getTrailingRevenue } from "@/app/utils/chartUtils";

import { TrailingRevenueForm } from "@/components/onboarding/buyer/forms/TrailingRevenueForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function TrailingRevenuePage() {
  const trailingRevenueArr = await getTrailingRevenue();

  console.log(trailingRevenueArr, "trailingRevenueArr in chart page");
  const chartData = createChartData(trailingRevenueArr, 50000, 10);

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your trailing revenue target range?</CardTitle>
          <CardDescription>
            Choose the range of trailing revenue you are looking for
          </CardDescription>
        </CardHeader>
        <TrailingRevenueForm chartData={chartData} />
      </Card>
    </>
  );
}
