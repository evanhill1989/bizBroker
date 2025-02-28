"use client";

import { handleBackNavigation } from "@/app/utils/actions/onboardingActions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UpdateDescriptions } from "@/app/utils/actions/sellerOnboardingActions";

export default function DescriptionsForm() {
  return (
    <>
      <form action={UpdateDescriptions}>
        <CardContent>
          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name="businessName"
              placeholder="Business Name"
            />
          </label>

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

          <label className="flex items-center space-x-2">
            <Input
              type="text"
              name="longDescription"
              placeholder="Short Description"
            />
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
