"use client";

import { UpdateBuyerRevenueMultipleStepAction } from "@/app/utils/actions/onboardingActions";

import { RevenueMultipleFormSchema } from "@/app/utils/zodSchemas";
import Chart from "./charts/Chart";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { BackButton } from "@/components/dashboard/BackButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";

import { JSONContent } from "novel";
import { Label } from "@radix-ui/react-dropdown-menu";

interface RevenueMultipleFormProps {
  chartData?: any;
}

export function RevenueMultipleForm({ chartData }: RevenueMultipleFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerRevenueMultipleStepAction,
    undefined
  );

  // const [minValue, setMinValue] = useState<JSONContent | string>("");
  // const [maxValue, setMaxValue] = useState<JSONContent | string>("");

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: RevenueMultipleFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent>
          <Chart
            chartData={chartData}
            chartName="Price Range"
            chartMax="1,000,000"
          />
          <div className="flex justify-around gap-10">
            <div className="flex flex-col justify-between align-middle ">
              <Label>Minimum</Label>
              <Input
                name={fields.minValue.name}
                key={fields.minValue.key}
                // defaultValue={minValue}
                // onChange={(e) => setMinValue(e.target.value)}
                // value={fields.minValue.value}
              />
              <p className="text-xs text-red-500">{fields.minValue.errors}</p>
            </div>
            <div className="flex flex-col justify-between">
              <Label>Maximum</Label>
              <Input
                key={fields.maxValue.key}
                name={fields.maxValue.name}
                //  defaultValue={fields.maxValue.value}
              />
              <p className="text-xs text-red-500">{fields.maxValue.errors}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="w-full">
          {/* <BackButton>Back </BackButton> */}
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
