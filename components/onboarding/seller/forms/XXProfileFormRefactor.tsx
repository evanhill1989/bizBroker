"use client";

import { handleSellerBackNav } from "@/app/utils/actions/onboardingActions";

import { UpdateProfile } from "@/app/utils/actions/sellerOnboardingActions";
import { ProfileSchema } from "@/app/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { FormInput } from "./FormInput";

export default function ProfileFormRefactor({
  listingId,
}: {
  listingId: string;
}) {
  const [lastResult, action] = useActionState(UpdateProfile, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProfileSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const fieldsConfig = [
    {
      label: "Scale",
      name: fields.scale.name,
      placeholder: "Scale",
      inputType: "radio",
      options: ["local", "regional", "national", "global"],
      error: fields.scale.errors?.join(", ") || "",
    },
    {
      label: "Business Model",
      name: fields.businessModel.name,
      placeholder: "Business Model",
      inputType: "radio",
      options: ["retail", "online", "b2b"],
      error: fields.businessModel.errors?.join(", ") || "",
    },
    {
      label: "Maturity",
      name: fields.maturity.name,
      placeholder: "Maturity",
      inputType: "radio",
      options: ["startup", "growing", "established"],
      error: fields.maturity.errors?.join(", ") || "",
    },
    {
      label: "location",
      name: fields.location.name,
      placeholder: "location",
      inputType: "text",
      error: fields.location.errors?.join(", ") || "",
    },
    {
      label: "Date Founded",
      name: fields.foundedDate.name,
      placeholder: "Date Founded",
      inputType: "number",
      error: fields.foundedDate.errors?.join(", ") || "",
    },
    {
      label: "Number of Employees",
      name: fields.numEmployees.name,
      placeholder: "Number of Employees",
      inputType: "number",
      error: fields.numEmployees.errors?.join(", ") || "",
    },
    {
      label: "Competitors",
      name: fields.competitors.name,
      placeholder: "Competitors",
      inputType: "text",
      error: fields.competitors.errors?.join(", ") || "",
    },
    {
      label: "Growth Opportunities",
      name: fields.growthOpportunities.name,
      placeholder: "Growth Opportunities",
      inputType: "text",
      error: fields.growthOpportunities.errors?.join(", ") || "",
    },
    {
      label: "Assets",
      name: fields.assets.name,
      placeholder: "Assets",
      inputType: "text",
      error: fields.assets.errors?.join(", ") || "",
    },
    {
      label: "Selling Reason",
      name: fields.sellingReason.name,
      placeholder: "Selling Reason",
      inputType: "textarea",
      error: fields.sellingReason.errors?.join(", ") || "",
    },
    {
      label: "Financing",
      name: fields.financing.name,
      placeholder: "Financing",
      inputType: "text",
      error: fields.financing.errors?.join(", ") || "",
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
        {fieldsConfig.map((field, index) =>
          field.inputType === "radio" ? (
            <FormInput key={index} {...field} />
          ) : (
            <FormInput key={index} {...field} />
          )
        )}
      </CardContent>

      <CardFooter className="w-full flex justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => handleSellerBackNav}
        >
          Back
        </Button>
        <SubmitButton text="Next" />
      </CardFooter>
    </form>
  );
}
