"use client";

// import { useTransition } from "react";
import { CreateBuyerAction } from "@/app/actions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

export function BuyerOnboardingForm() {
  // const [isPending, startTransition] = useTransition();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   // Call the server action
  //   startTransition(() => {
  //     void CompleteOnboardingAction(formData);
  //   });
  // };

  return (
    <form
      action={CreateBuyerAction}
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
      </select>

      <SubmitButton text="Complete Onboarding" />
    </form>
  );
}
