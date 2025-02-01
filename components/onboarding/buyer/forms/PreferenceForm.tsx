"use client";

import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import Chart from "./charts/Chart";

interface PreferenceFormProps {
  action: (formData: FormData) => Promise<void>;
  label: string;
  options?: { value: string; label: string }[];
  chartData?: { count: number }[];
  chartName?: string;
  chartMax?: string;
}

export function PreferenceForm({
  action,
  label,
  options,
  chartData,
  chartName,
  chartMax,
}: PreferenceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4 w-full mx-auto">
      {chartData && chartName && chartMax && (
        <>
          <Chart
            chartData={chartData}
            chartName={chartName}
            chartMax={chartMax}
          />
          <div className="flex justify-between align-middle ">
            <input
              type="text"
              name="minValue"
              defaultValue={0}
              className="border-2 border-gray-300 rounded-lg p-2  "
            />
            <div className="flex flex-col justify-between">
              <div></div>
              <div className="h-1 bg-gray-300 w-8 rounded-sm"></div>
              <div></div>
            </div>
            <input
              type="text"
              name="maxValue"
              defaultValue={chartMax}
              className=" border-2 border-slate-300 rounded-lg p-2 "
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
