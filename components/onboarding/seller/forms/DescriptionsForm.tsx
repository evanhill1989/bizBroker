"use client";

import { handleBackNavigation } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateDescriptions } from "@/app/utils/actions/sellerOnboardingActions";
import { DescriptionSchema } from "@/app/utils/zodSchemas";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionsForm() {
  const [lastResult, action] = useActionState(UpdateDescriptions, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: DescriptionSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="flex flex-col gap-4"
      >
        <CardContent className="flex flex-col gap-4">
          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name={fields.description.name}
              placeholder="Description"
            />
          </label>
          <p className="text-xs text-red-500 mt-2">
            {fields.description.errors}
          </p>

          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name={fields.shortDescription.name}
              placeholder="Short Description"
            />
          </label>
          <p className="text-xs text-red-500 mt-2">
            {fields.shortDescription.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Long Description
          </Label>
          <Textarea
            name={fields.longDescription.name}
            placeholder="Long Description"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.longDescription.errors}
          </p>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleBackNavigation("businessmodel")}
          >
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
