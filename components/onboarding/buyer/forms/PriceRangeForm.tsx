"use client";

import { UpdateBuyerPriceRangeStepAction } from "@/app/utils/actions/onboardingActions";

import { PriceRangeFormSchema } from "@/app/utils/zodSchemas";
import Chart from "./charts/Chart";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { BackButton } from "@/components/dashboard/BackButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";

import { JSONContent } from "novel";

interface PriceRangeFormProps {
  chartData?: any;
}

export function PriceRangeForm({ chartData }: PriceRangeFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerPriceRangeStepAction,
    undefined
  );

  // const [minValue, setMinValue] = useState<JSONContent | string>("");
  // const [maxValue, setMaxValue] = useState<JSONContent | string>("");

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: PriceRangeFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent>
          {chartData && (
            <>
              <Chart
                chartData={chartData}
                chartName="Price Range"
                chartMax="1,000,000"
              />
              <div className="flex justify-between align-middle ">
                <Input
                  name={fields.minValue.name}
                  key={fields.minValue.key}
                  defaultValue={fields.minValue.initialValue}
                  // onChange={(e) => setMinValue(e.target.value)}
                  // value={fields.minValue.value}
                />
                <p>{fields.minValue.errors}</p>
                <div className="flex flex-col justify-between">
                  <div></div>
                  <div className="h-1 bg-gray-300 w-8 rounded-sm"></div>
                  <div></div>
                </div>
                <Input
                  key={fields.maxValue.key}
                  name={fields.maxValue.name}
                  // defaultValue={fields.maxValue.initialValue}
                  // onChange={(e) => {
                  //   setMaxValue(e.target.value);
                  // }}
                  // value={fields.maxValue.value}
                />
                <p>{fields.minValue.errors}</p>
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
      </form>
    </>
  );
}
