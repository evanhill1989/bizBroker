"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { FormInput } from "@/components/onboarding/seller/forms/FormInput";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { UpdateWholeListing } from "@/app/utils/actions/sellerOnboardingActions";
import { WholeListingSchema } from "@/app/utils/zodSchemas";
import { fieldsConfig } from "./listingUpdateFieldsConfig";

interface Field {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

interface ListingUpdateFormProps {
  listingId: string;
}

export default function ListingUpdateForm({
  listingId,
}: ListingUpdateFormProps) {
  const [lastResult, action] = useActionState(UpdateWholeListing, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: WholeListingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const fieldsConfig = [
    {
      label: "Price",
      name: fields.price.name,
      placeholder: "Price",
      type: "number",
      error: fields.price.errors,
    },
    {
      label: "Profit Multiple",
      name: fields.profitMultiple.name,
      placeholder: "Profit Multiple",
      type: "number",
      error: fields.profitMultiple.errors,
    },
    {
      label: "Revenue Multiple",
      name: fields.revenueMultiple.name,
      placeholder: "0",
      type: "number",
      error: fields.revenueMultiple.errors,
    },
    {
      label: "Trailing 12 month profit",
      name: fields.trailing12MonthProfit.name,
      placeholder: "0",
      type: "number",
      error: fields.trailing12MonthProfit.errors,
    },
    {
      label: "Trailing 12 month revenue",
      name: fields.trailing12MonthRevenue.name,
      placeholder: "0",
      type: "number",
      error: fields.trailing12MonthRevenue.errors,
    },
    {
      label: "Last month revenue",
      name: fields.lastMonthRevenue.name,
      placeholder: "0",
      type: "number",
      error: fields.lastMonthRevenue.errors,
    },
    {
      label: "Last month profit",
      name: fields.lastMonthProfit.name,
      placeholder: "0",
      type: "number",
      error: fields.lastMonthProfit.errors,
    },
  ];

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="listingId" value={listingId} />

      <CardContent className="flex flex-col gap-4">
        {fieldsConfig.map((field, index) => (
          <FormInput key={index} {...field} />
        ))}
      </CardContent>

      <CardFooter className="w-full flex justify-between">
        <SubmitButton text="Next" />
      </CardFooter>
    </form>
  );
}
