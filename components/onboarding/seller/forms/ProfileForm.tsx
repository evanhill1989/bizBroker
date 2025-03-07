"use client";

import { handleBackNavigation } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateProfile } from "@/app/utils/actions/sellerOnboardingActions";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileForm() {
  return (
    <>
      <form action={UpdateProfile} className="flex flex-col gap-4">
        <CardContent className="flex flex-col gap-4">
          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">
              Select your primary business model:
            </legend>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="businessmodel" value="retail" />
              <span>Retail</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="businessmodel" value="online" />
              <span>Online</span>
            </label>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="businessmodel" value="b2b" />
              <span>Business to Business</span>
            </label>
          </fieldset>

          <fieldset className="flex flex-col space-y-2">
            <legend className="text-lg font-medium">Select your scale:</legend>

            <label className="flex items-center space-x-2">
              <Input type="radio" name="scale" value="micro" />
              <span>Micro</span>
            </label>
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
