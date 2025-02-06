import { createChartData, getTrailingProfit } from "@/app/utils/chartUtils";

import { TrailingProfitForm } from "@/components/onboarding/buyer/forms/TrailingProfitForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function TrailingProfitPage() {
  const trailingProfitArr = await getTrailingProfit();

  console.log(trailingProfitArr, "trailingProfitArr in chart page");
  const chartData = createChartData(trailingProfitArr, 20000, 10);

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your trailing profit target range?</CardTitle>
          <CardDescription>
            Choose the range of trailing profit you are looking for
          </CardDescription>
        </CardHeader>
        <TrailingProfitForm chartData={chartData} />
      </Card>
    </>
  );
}
