import { createChartData, getProfitMultiples } from "@/app/utils/chartUtils";

import { ProfitMultipleForm } from "@/components/onboarding/buyer/forms/ProfitMultipleForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function ProfitMultiplePage() {
  const profitMultipleArr = await getProfitMultiples();

  console.log(profitMultipleArr, "profitMultipleArr in chart page");
  const chartData = createChartData(profitMultipleArr, 1, 10);

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your profit multiple target range?</CardTitle>
          <CardDescription>
            Choose the range of profit multiples you are looking for
          </CardDescription>
        </CardHeader>
        <ProfitMultipleForm chartData={chartData} />
      </Card>
    </>
  );
}
