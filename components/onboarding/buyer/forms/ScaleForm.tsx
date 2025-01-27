"use client";

// import { useTransition } from "react";
import { CreateBuyerScaleStepAction } from "@/app/actions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

export function ScaleForm() {
  return (
    <form
      action={CreateBuyerScaleStepAction}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <label htmlFor="preferences" className="font-medium">
        What scale business are you interested in?
      </label>
      <select
        name="preferences"
        id="preferences"
        className="border border-gray-300 rounded-md p-2"
        required
      >
        <option value="small">Small - Less than 10 employees</option>
        <option value="medium">Medium - 10-100 employees</option>
        <option value="large">Large - More than 100 employees</option>
      </select>

      <SubmitButton text="Submit" />
    </form>
  );
}
