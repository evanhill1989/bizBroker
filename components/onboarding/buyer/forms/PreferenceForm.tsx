"use client";

import { SubmitButton } from "@/components/dashboard/SubmitButtons";

interface PreferenceFormProps {
  action: (formData: FormData) => Promise<void>;
  label: string;
  options: { value: string; label: string }[];
}

export function PreferenceForm({
  action,
  label,
  options,
}: PreferenceFormProps) {
  return (
    <form
      action={action}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
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
