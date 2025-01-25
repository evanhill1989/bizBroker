"use client";

import { useTransition } from "react";
import { CompleteOnboardingAction } from "@/app/actions";

export function CompleteOnboardingForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Call the server action
    startTransition(() => {
      void CompleteOnboardingAction(formData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <label htmlFor="preferences" className="font-medium">
        What are you interested in?
      </label>
      <select
        name="preferences"
        id="preferences"
        className="border border-gray-300 rounded-md p-2"
        required
      >
        <option value="buying">Buying Businesses</option>
        <option value="selling">Selling Businesses</option>
        <option value="both">Both</option>
      </select>

      <button
        type="submit"
        disabled={isPending}
        className={`p-2 bg-blue-500 text-white rounded-md ${
          isPending ? "opacity-50" : "hover:bg-blue-600"
        }`}
      >
        {isPending ? "Processing..." : "Complete Onboarding"}
      </button>
    </form>
  );
}
