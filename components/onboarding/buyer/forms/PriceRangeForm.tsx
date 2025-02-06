"use client";

import { UpdateBuyerPriceRangeStepAction } from "@/app/utils/actions/onboardingActions";

import { PriceRangeFormSchema } from "@/app/utils/zodSchemas";
import Chart from "./charts/Chart";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

interface PriceRangeFormProps {
  chartData?: any;
}

export function PriceRangeForm({ chartData }: PriceRangeFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerPriceRangeStepAction,
    undefined
  );

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
          <Chart
            chartData={chartData}
            chartName="Price Range"
            chartMax="1,000,000"
            chartMin="0"
          />
          <div className="flex w-full justify-between gap-10">
            <div className="flex flex-col justify-between align-middle ">
              <Label>Min</Label>
              <Input name={fields.minValue.name} key={fields.minValue.key} />
              <p className="text-xs text-red-500 mt-2">
                {fields.minValue.errors}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <Label>Max</Label>
              <Input key={fields.maxValue.key} name={fields.maxValue.name} />
              <p className="text-xs text-red-500 mt-2">
                {fields.maxValue.errors}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button type="button" variant="ghost">
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
