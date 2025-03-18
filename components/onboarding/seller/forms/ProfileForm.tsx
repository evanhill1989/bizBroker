"use client";

import { handleSellerBackNav } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateProfile } from "@/app/utils/actions/sellerOnboardingActions";
import { ProfileSchema } from "@/app/utils/zodSchemas";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormInput } from "./FormInput";
import { Placeholder } from "novel/extensions";

export default function ProfileForm({ listingId }: { listingId: string }) {
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
      label: "Date of Establishment",
      name: fields.foundedDate.name,
      placeholder: "Founded Date",
      type: "date",
      error: fields.foundedDate.errors?.join(", ") || "",
    },
    {
      label: "Number of Employees",
      name: fields.numEmployees.name,
      placeholder: "Number of Employees",
      type: "number",
      error: fields.numEmployees.errors?.join(", ") || "",
    },
    {
      label: "Competitors",
      name: fields.competitors.name,
      placeholder: "Competitors",
      type: "text",
      error: fields.competitors.errors?.join(", ") || "",
    },
    {
      label: "Growth Opportunities",
      name: fields.growthOpportunities.name,
      placeholder: "Growth Opportunities",
      type: "text",
      error: fields.growthOpportunities.errors?.join(", ") || "",
    },
    {
      label: "Assets",
      name: fields.assets.name,
      placeholder: "Assets",
      type: "text",
      error: fields.assets.errors?.join(", ") || "",
    },
    {
      label: "Selling Reason",
      name: fields.sellingReason.name,
      placeholder: "Selling Reason",
      type: "textarea",
      error: fields.sellingReason.errors?.join(", ") || "",
    },
    {
      label: "Financing",
      name: fields.financing.name,
      placeholder: "Financing",
      type: "textarea",
      error: fields.financing.errors?.join(", ") || "",
    },
    {
      label: "Retail",
      name: fields.businessModel.name,
      placeholder: "Retail",
      type: "radio",
      error: fields.businessModel.errors?.join(", ") || "",
    },
    {
      label: "Online",
      name: fields.businessModel.name,
      placeholder: "Online",
      type: "radio",
      error: fields.businessModel.errors?.join(", ") || "",
    },
    {
      label: "Business to Business",
      name: fields.businessModel.name,
      placeholder: "Business to Business",
      type: "radio",
      error: fields.businessModel.errors?.join(", ") || "",
    },
    {
      label: "Local",
      name: fields.scale.name,
      placeholder: "Local",
      type: "radio",
      error: fields.scale.errors?.join(", ") || "",
    },
    {
      label: "Regional",
      name: fields.scale.name,
      placeholder: "Regional",
      type: "radio",
      error: fields.scale.errors?.join(", ") || "",
    },
    {
      label: "National",
      name: fields.scale.name,
      placeholder: "National",
      type: "radio",
      error: fields.scale.errors?.join(", ") || "",
    },
    {
      label: "Global",
      name: fields.scale.name,
      placeholder: "Global",
      type: "radio",
      error: fields.scale.errors?.join(", ") || "",
    },

    {
      label: "Startup",
      name: fields.maturity.name,
      placeholder: "Startup",
      type: "radio",
      error: fields.maturity.errors?.join(", ") || "",
    },
    {
      label: "Growing",
      name: fields.maturity.name,
      placeholder: "Growing",
      type: "radio",
      error: fields.maturity.errors?.join(", ") || "",
    },
    {
      label: "Established",
      name: fields.maturity.name,
      placeholder: "Established",
      type: "radio",
      error: fields.maturity.errors?.join(", ") || "",
    },
  ];
  return (
    <>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="listingId" value={listingId} />
        <CardContent className="flex flex-col gap-4">
          <FormInput {...fieldsConfig[0]} />
          <FormInput {...fieldsConfig[1]} />
          <FormInput {...fieldsConfig[2]} />
          <FormInput {...fieldsConfig[3]} />
          <FormInput {...fieldsConfig[4]} />
          <FormInput {...fieldsConfig[5]} />
          <FormInput {...fieldsConfig[6]} />

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your primary business model:
            </legend>

            <FormInput {...fieldsConfig[7]} />
            <FormInput {...fieldsConfig[8]} />
            <FormInput {...fieldsConfig[9]} />
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">Select your scale:</legend>
            <FormInput {...fieldsConfig[10]} />
            <FormInput {...fieldsConfig[11]} />
            <FormInput {...fieldsConfig[12]} />
            <FormInput {...fieldsConfig[13]} />
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your maturity:
            </legend>

            <FormInput {...fieldsConfig[14]} />
            <FormInput {...fieldsConfig[15]} />
            <FormInput {...fieldsConfig[16]} />
          </fieldset>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleSellerBackNav("profile")}
          >
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
