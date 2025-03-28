"use client";

import { handleBackNavigation } from "@/app/utils/actions/onboardingActions";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { UpdateBuyerLocationStepAction } from "@/app/utils/actions/buyerOnboardingActions";

export function LocationForm() {
  return (
    <>
      <form action={UpdateBuyerLocationStepAction}>
        <CardContent>
          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your business:
            </legend>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="location" value="florida" />
              <span>Florida</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="location" value="not florida" />
              <span>Not Florida</span>
            </label>
          </fieldset>
        </CardContent>

        <CardFooter className="w-full flex justify-between">
          <Button
            type="submit"
            variant="ghost"
            onClick={() => handleBackNavigation("location")}
          >
            Back
          </Button>
          <SubmitButton text="Get results" />
        </CardFooter>
      </form>
    </>
  );
}
