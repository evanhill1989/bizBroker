"use client";

import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import Chart from "./charts/Chart";

interface PreferenceFormProps {
  action: (formData: FormData) => Promise<void>;
  label: string;
  options: { value: string; label: string }[];
  chartData?: number[];
}

export function PreferenceForm({
  action,
  label,
  options,
  chartData,
}: PreferenceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4 w-full mx-auto">
      {chartData && <Chart chartData={chartData} />}
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

      <SubmitButton text="Submit" />
    </form>
  );
}
