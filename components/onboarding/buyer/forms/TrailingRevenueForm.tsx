"use client";

import {
  handleBackNavigation,
  UpdateBuyerTrailingRevenueStepAction,
} from "@/app/utils/actions/onboardingActions";

import { TrailingRevenueFormSchema } from "@/app/utils/zodSchemas";
import Chart from "./charts/Chart";
import { ChartDataItem } from "@/app/utils/chartTypes";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

interface TrailingRevenueFormProps {
  chartData?: ChartDataItem[];
}

export function TrailingRevenueForm({
  chartData = [],
}: TrailingRevenueFormProps) {
  const [lastResult, action] = useActionState(
    UpdateBuyerTrailingRevenueStepAction,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: TrailingRevenueFormSchema });
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
            chartName="Trailing Revenue"
            chartMax="500,000"
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
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleBackNavigation("trailingrevenue")}
          >
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
