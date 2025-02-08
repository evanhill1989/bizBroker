"use client";

import { handleBackNavigation, UpdateBuyerScaleStepAction } from "@/app/utils/actions/onboardingActions";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";

export function ScaleForm() {
  return (
    <>
      <form action={UpdateBuyerScaleStepAction}>
        <CardContent>
          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">Select your scale:</legend>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="scale" value="local" />
              <span>Local</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="scale" value="national" />
              <span>National</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="scale" value="global" />
              <span>Global</span>
            </label>
          </fieldset>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button type="submit" variant="ghost" onClick={() => handleBackNavigation("scale")}>
            Back
          </Button>
          <SubmitButton text="Next" />
        </CardFooter>
      </form>
    </>
  );
}
