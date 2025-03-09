"use client";

import { handleSellerBackNav } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdatePrice } from "@/app/utils/actions/sellerOnboardingActions";
import { PriceSchema } from "@/app/utils/zodSchemas";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

import { Label } from "@/components/ui/label";

export default function PriceForm({ listingId }: { listingId: string }) {
  const [lastResult, action] = useActionState(UpdatePrice, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PriceSchema });
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
          <label className="flex items-center space-x-2">
            <Input type="number" name={fields.price.name} placeholder="Price" />
          </label>
          <p className="text-xs text-red-500 mt-2">{fields.price.errors}</p>

          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name={fields.profitMultiple.name}
              placeholder="Profit Multiple"
            />
          </label>
          <p className="text-xs text-red-500 mt-2">
            {fields.profitMultiple.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Revenue Multiple
          </Label>
          <Input
            type="text"
            name={fields.revenueMultiple.name}
            placeholder="0"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.revenueMultiple.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Trailing 12 month profit
          </Label>
          <Input
            type="text"
            name={fields.trailing12MonthProfit.name}
            placeholder="0"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.trailing12MonthProfit.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Trailing 12 month revenue
          </Label>
          <Input
            type="text"
            name={fields.trailing12MonthRevenue.name}
            placeholder="0"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.trailing12MonthRevenue.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Last month revenue
          </Label>
          <Input
            type="text"
            name={fields.lastMonthRevenue.name}
            placeholder="0"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.lastMonthRevenue.errors}
          </p>

          <Label className="flex items-center space-x-2">
            Last month profit
          </Label>
          <Input
            type="text"
            name={fields.lastMonthProfit.name}
            placeholder="0"
          />
          <p className="text-xs text-red-500 mt-2">
            {fields.lastMonthProfit.errors}
          </p>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleSellerBackNav("price")}
          >
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
