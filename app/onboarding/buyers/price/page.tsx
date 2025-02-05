import { BackButton } from "@/components/dashboard/BackButton";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

import { getListingPrices, createChartData } from "@/app/utils/chartUtils";

import { PriceRangeFormSchema } from "@/app/utils/zodSchemas";
import { PriceRangeForm } from "@/components/onboarding/buyer/forms/PriceRangeForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Remember you may want to convert this back to server comp, and import form client component nested

export default async function BuyerPriceRangePage() {
  const pricesArr = await getListingPrices();

  const chartData = createChartData(pricesArr, 50000, 10);

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
        <PriceRangeForm chartData={chartData} />
        {/* <form action={UpdateBuyerPriceRangeStepAction}>
          <CardContent>
          {chartData && chartName && chartMax && (
        <>
          <Chart
            chartData={chartData}
            chartName={chartName}
            chartMax={chartMax}
          />
          <div className="flex justify-between align-middle ">
            <Input
              // key={fields.title.key}
              name="maxValue"
              defaultValue="0"
              onChange={(e) => setMaxValue(e.target.value)}
            />
            <div className="flex flex-col justify-between">
              <div></div>
              <div className="h-1 bg-gray-300 w-8 rounded-sm"></div>
              <div></div>
            </div>
            <Input
              // key={fields.title.key}
              name="maxValue"
              defaultValue={chartMax}
              onChange={(e) => {
                console.log(e.target.value);
                setMaxValue(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between w-full">
            <button className="border border-gray-300 rounded-md p-2">
              Back
            </button>
            <SubmitButton text="Next" />
          </div>
        </>
      )}
          </CardContent>

          <CardFooter className="w-full">
            <BackButton>Back </BackButton>
            <SubmitButton text="Next" />
          </CardFooter>
        </form> */}
      </Card>
    </>
  );
}
