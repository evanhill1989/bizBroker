"use client";

import {
  handleBackNavigation,
  UpdateBuyerMaturityStepAction,
} from "@/app/utils/actions/buyerOnboardingActions";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

import { Button } from "@/components/ui/button";

export function MaturityForm() {
  return (
    <>
      <form action={UpdateBuyerMaturityStepAction}>
        <CardContent>
          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your maturity:
            </legend>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="maturity" value="startup" />
              <span>Startup</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="maturity" value="growing" />
              <span>Growing</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="maturity" value="established" />
              <span>Established</span>
            </label>
          </fieldset>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleBackNavigation("maturity")}
          >
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
