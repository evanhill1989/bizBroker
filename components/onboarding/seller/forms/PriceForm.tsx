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
            <Input type="text" name="description" placeholder="Description" />
          </label>

          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name="shortDescription"
              placeholder="Short Description"
            />
          </label>

          <Label className="flex items-center space-x-2">
            Long Description
          </Label>
          <Textarea name="longDescription" placeholder="Long Description" />
          {/* <TailwindEditor  /> */}
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
