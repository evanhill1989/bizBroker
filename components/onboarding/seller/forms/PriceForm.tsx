"use client";

import { handleBackNavigation } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdatePrice } from "@/app/utils/actions/sellerOnboardingActions";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PriceForm() {
  return (
    <>
      <form action={UpdatePrice} className="flex flex-col gap-4">
        <CardContent className="flex flex-col gap-4">
          <label className="flex items-center space-x-2">
            <Input type="text" name="price" placeholder="Price" />
          </label>

          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name="profitMultiple"
              placeholder="Profit Multiple"
            />
          </label>

          <Label className="flex items-center space-x-2">
            Revenue Multiple
          </Label>
          <Input type="text" name="revenueMultiple" placeholder="0" />

          <Label className="flex items-center space-x-2">
            Trailing 12 month profit
          </Label>
          <Input type="text" name="trailing12MonthProfit" placeholder="0" />

          <Label className="flex items-center space-x-2">
            Trailing 12 month revenue
          </Label>
          <Input type="text" name="trailing12MonthRevenue" placeholder="0" />

          <Label className="flex items-center space-x-2">
            Last month revenue
          </Label>
          <Input type="text" name="lastMonthRevenue" placeholder="0" />

          <Label className="flex items-center space-x-2">
            Last month profit
          </Label>
          <Input type="text" name="lastMonthProfit" placeholder="0" />
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
