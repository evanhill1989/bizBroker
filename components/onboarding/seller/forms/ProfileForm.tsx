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

export default function ProfileForm({ listingId }: { listingId: string }) {
  const [lastResult, action] = useActionState(UpdateProfile, undefined);

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      competitors: "test",
      growthOpportunities: "test",
      assets: "test",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProfileSchema });
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
        <input type="hidden" name="listingId" value={listingId} />
        <CardContent className="flex flex-col gap-4">
          <Label>Date of Establishment</Label>
          <Input
            type="date"
            name={fields.foundedDate.name}
            placeholder="Date of Establishment"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.foundedDate.errors}
          </p>
          <Label>Number of Employees</Label>
          <Input
            type="number"
            name={fields.numEmployees.name}
            placeholder="Number of Employees"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.numEmployees.errors}
          </p>

          <Label>Competitors</Label>
          <Input
            type="text"
            name={fields.competitors.name}
            placeholder="Competitors"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.competitors.errors}
          </p>

          <Label>Growth Opportunities</Label>
          <Input
            type="text"
            defaultValue={fields.growthOpportunities.value}
            name={fields.growthOpportunities.name}
            placeholder="Growth Opportunities"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.growthOpportunities.errors}
          </p>

          <Label>Assets</Label>
          <Input type="text" name={fields.assets.name} placeholder="Assets" />
          <p className="text-xs text-red-500 mt-2">{fields.assets.errors}</p>

          <Label>Selling Reason</Label>
          <Textarea
            name={fields.sellingReason.name}
            placeholder="Selling Reason"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.sellingReason.errors}
          </p>

          <Label>Financing</Label>
          <Textarea name={fields.financing.name} placeholder="Financing" />
          <p className="text-xs text-red-500 mt-2">{fields.financing.errors}</p>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your primary business model:
            </legend>

            <Label className="flex items-center space-x-2">
              <Input
                type="radio"
                name={fields.businessModel.name}
                value="retail"
              />
              <span>Retail</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input
                type="radio"
                name={fields.businessModel.name}
                value="online"
              />
              <span>Online</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input
                type="radio"
                name={fields.businessModel.name}
                value="b2b"
              />
              <span>Business to Business</span>
            </Label>
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">Select your scale:</legend>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.scale.name} value="local" />
              <span>Local</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.scale.name} value="regional" />
              <span>Regional</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.scale.name} value="national" />
              <span>National</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.scale.name} value="global" />
              <span>Global</span>
            </Label>
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your maturity:
            </legend>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.maturity.name} value="startup" />
              <span>Startup</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input type="radio" name={fields.maturity.name} value="growing" />
              <span>Growing</span>
            </Label>

            <Label className="flex items-center space-x-2">
              <Input
                type="radio"
                name={fields.maturity.name}
                value="established"
              />
              <span>Established</span>
            </Label>
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
