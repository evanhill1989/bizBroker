"use client";

import { handleSellerBackNav } from "@/app/utils/actions/onboardingActions";
import {
  UpdateDescriptions,
  UpdateProfile,
} from "@/app/utils/actions/sellerOnboardingActions";
import { DescriptionSchema, ProfileSchema } from "@/app/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import ListingCreationForm from "./ListingCreationForm";

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
      label: "Description",
      name: fields.description.name,
      placeholder: "Description",
      type: "number",
      error: fields.description.errors?.join(", ") || "",
    },
    {
      label: "Short Description",
      name: fields.shortDescription.name,
      placeholder: "Short Description",
      type: "number",
      error: fields.shortDescription.errors?.join(", ") || "",
    },
    {
      label: "Long Description",
      name: fields.longDescription.name,
      placeholder: "Long Description",
      type: "number",
      error: fields.longDescription.errors?.join(", ") || "",
    },
  ];

  return (
    <ListingCreationForm
      fields={fieldsConfig}
      listingId={listingId}
      action={action}
      form={form}
      handleBackNav={() => handleSellerBackNav("description")}
    />
  );
}
