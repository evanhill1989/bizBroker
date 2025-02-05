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

  const chartData = createChartData(revMultipleArr, 50000, 10);

  return (
    <>
      <Card className="w-1/2 m-auto">
        <CardHeader>
          <CardTitle>What business model are you looking for?</CardTitle>
          <CardDescription>
            Choose the the type that most accurately represents the majority of
            your revenue streams
          </CardDescription>
        </CardHeader>
        <RevenueMultipleForm chartData={chartData} />
      </Card>
    </>
  );
}
