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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ListingData {
  id: string;
  businessName: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  subdirectory: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  imageUrl: string;
  userId: string;
  businessModel: string;
  scale: string;
  maturity: string;
  location: string;
  foundedDate: string; // ISO string format
  numEmployees: number;
  competitors: string | null;
  growthOpportunities: string | null;
  assets: string | null;
  sellingReason: string;
  financing: string;
  price: number;
  profitMultiple: number;
  revenueMultiple: number;
  trailing12MonthProfit: number;
  trailing12MonthRevenue: number;
  lastMonthRevenue: number;
  lastMonthProfit: number;
  listingOnboardingStep: string;
}

export default function ListingUpdateForm({
  listingId,
  listingData,
}: {
  listingId: string;
  listingData: ListingData;
}) {
  const [lastResult, action] = useActionState(UpdateWholeListing, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: WholeListingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  console.log("fields in listing update form", fields);

  const editableFields = [
    { fieldName: "businessName", type: "text", label: "Business Name" },
    { fieldName: "description", type: "textarea", label: "Description" },
    {
      fieldName: "shortDescription",
      type: "textarea",
      label: "Short Description",
    },
    {
      fieldName: "longDescription",
      type: "textarea",
      label: "Long Description",
    },
    { fieldName: "businessModel", type: "text", label: "Business Model" },
    { fieldName: "scale", type: "text", label: "Scale" },
    { fieldName: "maturity", type: "text", label: "Maturity" },
    { fieldName: "location", type: "text", label: "Location" },
    { fieldName: "foundedDate", type: "date", label: "Founded Date" },
    { fieldName: "numEmployees", type: "number", label: "Number of Employees" },
    { fieldName: "sellingReason", type: "text", label: "Selling Reason" },
    { fieldName: "financing", type: "text", label: "Financing" },
    { fieldName: "price", type: "number", label: "Price" },
    { fieldName: "profitMultiple", type: "number", label: "Profit Multiple" },
    { fieldName: "revenueMultiple", type: "number", label: "Revenue Multiple" },
    {
      fieldName: "trailing12MonthProfit",
      type: "number",
      label: "Trailing 12-Month Profit",
    },
    {
      fieldName: "trailing12MonthRevenue",
      type: "number",
      label: "Trailing 12-Month Revenue",
    },
    {
      fieldName: "lastMonthRevenue",
      type: "number",
      label: "Last Month Revenue",
    },
    {
      fieldName: "lastMonthProfit",
      type: "number",
      label: "Last Month Profit",
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
        {editableFields.map(({ fieldName, type, label }) => (
          <div key={fieldName} className="flex flex-col gap-1">
            <Label htmlFor={fieldName}>{label}</Label>

            {type === "textarea" ? (
              <Textarea
                name={fieldName}
                id={fields[fieldName]?.name}
                placeholder={}
                defaultValue={listingData[listingDataName] || ""}
              />
            ) : (
              <Input
                type={type}
                name={fields[fieldName]?.name}
                id={fields[fieldName]?.name}
                placeholder={listingData?.[listingDataName]?.toString() || ""}
                defaultValue={listingData[listingDataName] || ""}
              />
            )}

            {fields[fieldName]?.errors && (
              <p className="text-xs text-red-500 mt-1">
                {fields[fieldName]?.errors}
              </p>
            )}
          </div>
        ))}
      </CardContent>

      <CardFooter className="w-full flex justify-between">
        <SubmitButton text="Save" />
      </CardFooter>
    </form>
  );
}
