"use client";

import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import Chart from "./charts/Chart";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  PriceRangeFormSchema,
  ProfitMultipleFormSchema,
  RevenueMultipleFormSchema,
  TrailingProfitFormSchema,
  TrailingRevenueFormSchema,
} from "@/app/utils/zodSchemas";
import { useActionState, useState } from "react";
import { z } from "zod";
import {
  CreateBuyerRevenueMultipleStepAction,
  CreatePostAction,
} from "@/app/utils/actions/actions";
import { Input } from "@/components/ui/input";
import { JSONContent } from "novel";

type SchemaType = z.ZodObject<{
  [key: string]: z.ZodSchema;
}>;

const schemaMap: Record<string, SchemaType> = {
  priceRange: PriceRangeFormSchema,
  trailingProfit: TrailingProfitFormSchema,
  trailingRevenue: TrailingRevenueFormSchema,
  revenueMultiple: RevenueMultipleFormSchema,
  profitMultiple: ProfitMultipleFormSchema,
};

interface PreferenceFormProps {
  formAction: (formData: FormData) => Promise<void>;
  label: string;
  options?: { value: string; label: string }[];
  chartData?: { count: number }[];
  chartName?: string;
  chartMax?: string;

  formType: string;
}

export function PreferenceForm({
  formAction,
  label,
  options,
  chartData,
  chartName,
  chartMax,
  formType,
}: PreferenceFormProps) {
  const [lastResult, action] = useActionState(
    CreateBuyerRevenueMultipleStepAction,
    undefined
  );
  console.log("formType", formType);

  const [minValue, setMinValue] = useState<JSONContent | string>("");
  const [maxValue, setMaxValue] = useState<JSONContent | string>("");

  // const selectedSchema = schemaMap[formType];

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, { schema: RevenueMultipleFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // maybe the issue is confusing my action with my action?
  return (
    <form
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
      className="flex flex-col gap-4 w-full mx-auto"
    >
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
      {options && (
        <>
          <label htmlFor="preferences" className="font-medium">
            {label}
          </label>
          <select
            name="preferences"
            id="preferences"
            className="border border-gray-300 rounded-md p-2"
            required
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex justify-between w-full">
            <button className="border border-gray-300 rounded-md p-2">
              Back
            </button>
            <SubmitButton text="Next" />
          </div>
        </>
      )}
    </form>
  );
}
