import { createChartData, getRevenueMultiples } from "@/app/utils/chartUtils";

import { RevenueMultipleForm } from "@/components/onboarding/buyer/forms/RevenueMultipleForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function RevenueMultiplePage() {
  const revMultipleArr = await getRevenueMultiples();

  console.log(revMultipleArr, "revMultipleArr in chart page");
  const chartData = createChartData(revMultipleArr, 1, 10);

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your revenue multiple target range?</CardTitle>
          <CardDescription>
            Choose the range of revenue multiples you are looking for
          </CardDescription>
        </CardHeader>
        <RevenueMultipleForm chartData={chartData} />
      </Card>
    </>
  );
}
