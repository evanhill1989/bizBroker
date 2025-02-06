"use client";

import { handleBackNavigation, UpdateBuyerTrailingProfitStepAction } from "@/app/utils/actions/onboardingActions";

import { TrailingProfitFormSchema } from "@/app/utils/zodSchemas";
import Chart from "./charts/Chart";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { BackButton } from "@/components/dashboard/BackButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

interface TrailingProfitFormProps {
  chartData?: any;
}

export function TrailingProfitForm({ chartData }: TrailingProfitFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerTrailingProfitStepAction,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: TrailingProfitFormSchema });
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
            chartName="Trailing Profit"
            chartMax="200,000"
            chartMin="0"
          />
          <div className="flex w-full gap-10 justify-between">
            <div className="flex flex-col justify-between align-middle">
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
          <Button type="submit" variant="ghost" onClick={() => handleBackNavigation("trailingprofit")}>
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
