"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleUpdateDescriptions } from "@/app/utils/actions/sellerOnboardingActions";
import { SubmitButton } from "../../SubmitButtons";
import { useActionState } from "react";

interface ListingUpdateFormProps {
  data: {
    description: string | null;
    shortDescription: string | null;
    longDescription: string | null;
  };
  listingId: string;
}

export default function NewListingUpdateForm({
  data,
  listingId,
}: ListingUpdateFormProps) {
  console.log(listingId, "listingId in NewListingUpdateForm");

  let [state, dispatch, isPending] = useActionState(
    SimpleUpdateDescriptions,
    undefined
  );

  return (
    <form action={SimpleUpdateDescriptions}>
      <input type="hidden" name="listingId" value={listingId} readOnly />

      <CardContent className="flex flex-col gap-4">
        <div>
          <Label className="flex items-center space-x-2">
            <span>Description</span>
            <Textarea
              name="description"
              defaultValue=""
              placeholder="Description"
            ></Textarea>
          </Label>
          <Label className="flex items-center space-x-2">
            <span>Short Description</span>
            <Textarea
              name="shortDescription"
              defaultValue=""
              placeholder="Short Description"
            ></Textarea>
          </Label>
          <Label className="flex items-center space-x-2">
            <span> Long Description</span>
            <Textarea
              name="longDescription"
              defaultValue=""
              placeholder="Long Description"
            ></Textarea>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <SubmitButton text="Save" />
      </CardFooter>
    </form>
  );
}
