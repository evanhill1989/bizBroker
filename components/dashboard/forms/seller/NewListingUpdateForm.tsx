"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleUpdateDescriptions } from "@/app/utils/actions/sellerOnboardingActions";
import { SubmitButton } from "../../SubmitButtons";
import { useActionState } from "react";

import { toast } from "@/hooks/use-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { DescriptionSchema } from "@/app/utils/zodSchemas";

interface ListingUpdateFormProps {
  listingData: {
    description: string;
    shortDescription?: string | null | undefined;
    longDescription?: string | null | undefined;
  };

  listingId: string;
}

export default function NewListingUpdateForm({
  listingData,
  listingId,
}: ListingUpdateFormProps) {
  const [lastResult, formAction] = useActionState(
    SimpleUpdateDescriptions,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      description: listingData.description,
      shortDescription: listingData.shortDescription,
      longDescription: listingData.longDescription,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: DescriptionSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  console.log("NewListingUpdateForm rendered");
  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={formAction}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="listingId" value={listingId} />

      <CardContent className="flex flex-col gap-4">
        <div>
          <Label className="flex items-center space-x-2">
            <span>Description</span>
            <Textarea
              name={fields.description.name}
              defaultValue={fields.description.value}
              placeholder="Description"
            ></Textarea>
          </Label>
          <Label className="flex items-center space-x-2">
            <span>Short Description</span>
            <Textarea
              name={fields.shortDescription.name}
              defaultValue={fields.shortDescription.value}
              placeholder="Short Description"
            ></Textarea>
          </Label>
          <Label className="flex items-center space-x-2">
            <span> Long Description</span>
            <Textarea
              name={fields.longDescription.name}
              defaultValue={fields.longDescription.value}
              placeholder="Long Description"
            ></Textarea>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <SubmitButton text="Save" />
      </CardFooter>
    </form>
  );
}
