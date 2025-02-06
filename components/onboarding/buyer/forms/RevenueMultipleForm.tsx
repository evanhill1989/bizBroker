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
import { Button } from "@/components/ui/button";

interface RevenueMultipleFormProps {
  chartData?: any;
}

export function RevenueMultipleForm({ chartData }: RevenueMultipleFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerRevenueMultipleStepAction,
    undefined
  );

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
            chartName="Revenue Multiple"
            chartMax="10"
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
          <Button type="button" variant="ghost">
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
