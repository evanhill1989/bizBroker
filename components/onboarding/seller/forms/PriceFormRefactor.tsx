"use client";

import { handleSellerBackNav } from "@/app/utils/actions/onboardingActions";
import { UpdatePrice } from "@/app/utils/actions/sellerOnboardingActions";
import { PriceSchema } from "@/app/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import ListingCreationForm from "./ListingCreationForm";

export default function PriceFormRefactor({
  listingId,
}: {
  listingId: string;
}) {
  const [lastResult, action] = useActionState(UpdatePrice, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PriceSchema });
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
      error: fields.price.errors?.join(", ") || "",
    },
    {
      label: "Profit Multiple",
      name: fields.profitMultiple.name,
      placeholder: "Profit Multiple",
      type: "number",
      error: fields.profitMultiple.errors?.join(", ") || "",
    },
    {
      label: "Revenue Multiple",
      name: fields.revenueMultiple.name,
      placeholder: "0",
      type: "number",
      error: fields.revenueMultiple.errors?.join(", ") || "",
    },
    {
      label: "Trailing 12 month profit",
      name: fields.trailing12MonthProfit.name,
      placeholder: "0",
      type: "number",
      error: fields.trailing12MonthProfit.errors?.join(", ") || "",
    },
    {
      label: "Trailing 12 month revenue",
      name: fields.trailing12MonthRevenue.name,
      placeholder: "0",
      type: "number",
      error: fields.trailing12MonthRevenue.errors?.join(", ") || "",
    },
    {
      label: "Last month revenue",
      name: fields.lastMonthRevenue.name,
      placeholder: "0",
      type: "number",
      error: fields.lastMonthRevenue.errors?.join(", ") || "",
    },
    {
      label: "Last month profit",
      name: fields.lastMonthProfit.name,
      placeholder: "0",
      type: "number",
      error: fields.lastMonthProfit.errors?.join(", ") || "",
    },
  ];

  return (
    <ListingCreationForm
      fields={fieldsConfig}
      listingId={listingId}
      action={action}
      form={form}
      handleBackNav={() => handleSellerBackNav("price")}
    />
  );
}
