"use client";

import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import Chart from "./charts/Chart";

interface PreferenceFormProps {
  action: (formData: FormData) => Promise<void>;
  label: string;
  options?: { value: string; label: string }[];
  chartData?: { count: number }[];
  chartName?: string;
  chartRanges?: string[];
}

export function PreferenceForm({
  action,
  label,
  options,
  chartData,
  chartName,
  chartRanges,
}: PreferenceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4 w-full mx-auto">
      {chartData && chartName && chartRanges && (
        <Chart
          chartData={chartData}
          chartName={chartName}
          chartRanges={chartRanges}
        />
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
        </>
      )}
      <SubmitButton text="Submit" />
    </form>
  );
}
