"use client";

import { CardContent, CardFooter } from "@/components/ui/card";

import { SimpleUpdateDescriptions } from "@/app/utils/actions/sellerOnboardingActions";
import { SubmitButton } from "../../SubmitButtons";
import { useActionState } from "react";

import { toast } from "@/hooks/use-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { WholeListingSchema } from "@/app/utils/zodSchemas";

import { Listing } from "@prisma/client";
import { UpdateFormField } from "./UpdateFormField";
import { UpdateWholeListing } from "@/app/utils/actions/dashboardActions";

type ListingProps = {
  listing: Listing;
  listingId: string;
};

export default function NewestListingUpdateForm({
  listing,
  listingId,
}: ListingProps) {
  const [lastResult, formAction] = useActionState(
    UpdateWholeListing,
    undefined
  );

  const defaultValues = {
    description: listing.description,
    shortDescription: listing.shortDescription,
    longDescription: listing.longDescription,
    price: listing.price,
    profitMultiple: listing.profitMultiple,
    revenueMultiple: listing.revenueMultiple,
    trailing12MonthProfit: listing.trailing12MonthProfit,
    trailing12MonthRevenue: listing.trailing12MonthRevenue,
    lastMonthRevenue: listing.lastMonthRevenue,
    lastMonthProfit: listing.lastMonthProfit,
    foundedDate: listing.foundedDate,
    numEmployees: listing.numEmployees,
    competitors: listing.competitors,
    growthOpportunities: listing.growthOpportunities,
    assets: listing.assets,
    sellingReason: listing.sellingReason,
    financing: listing.financing,
    scale: listing.scale,
    businessModel: listing.businessModel,
    maturity: listing.maturity,
    location: listing.location,
  };

  const [form, fields] = useForm({
    lastResult,
    defaultValue: defaultValues,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: WholeListingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={formAction}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="listingId" value={listingId} />

      <CardContent className="flex flex-col gap-4">
        <div className="descriptions">
          <UpdateFormField
            fieldName={fields.description.name}
            inputType="textarea"
            label={fields.description.name}
            defaultValue={fields.description.value}
          />
          <UpdateFormField
            fieldName={fields.shortDescription.name}
            inputType="textarea"
            label={fields.shortDescription.name}
            defaultValue={fields.shortDescription.value}
          />
          <UpdateFormField
            fieldName={fields.longDescription.name}
            inputType="textarea"
            label={fields.longDescription.name}
            defaultValue={fields.longDescription.value}
          />
        </div>
        <div className="price">
          <UpdateFormField
            fieldName={fields.price.name}
            inputType="number"
            label={fields.price.name}
            defaultValue={fields.price.value}
          />
          <UpdateFormField
            fieldName={fields.profitMultiple.name}
            inputType="number"
            label={fields.profitMultiple.name}
            defaultValue={fields.profitMultiple.value}
          />
          <UpdateFormField
            fieldName={fields.revenueMultiple.name}
            inputType="number"
            label={fields.revenueMultiple.name}
            defaultValue={fields.revenueMultiple.value}
          />
          <UpdateFormField
            fieldName={fields.trailing12MonthProfit.name}
            inputType="number"
            label={fields.trailing12MonthProfit.name}
            defaultValue={fields.trailing12MonthProfit.value}
          />
          <UpdateFormField
            fieldName={fields.trailing12MonthRevenue.name}
            inputType="number"
            label={fields.trailing12MonthRevenue.name}
            defaultValue={fields.trailing12MonthRevenue.value}
          />
          <UpdateFormField
            fieldName={fields.lastMonthRevenue.name}
            inputType="number"
            label={fields.lastMonthRevenue.name}
            defaultValue={fields.lastMonthRevenue.value}
          />
          <UpdateFormField
            fieldName={fields.lastMonthProfit.name}
            inputType="number"
            label={fields.lastMonthProfit.name}
            defaultValue={fields.lastMonthProfit.value}
          />
        </div>
        <div className="profile">
          <UpdateFormField
            fieldName={fields.foundedDate.name}
            inputType="date"
            label={fields.foundedDate.name}
            defaultValue={fields.foundedDate.value}
          />
          <UpdateFormField
            fieldName={fields.numEmployees.name}
            inputType="number"
            label={fields.numEmployees.name}
            defaultValue={fields.numEmployees.value}
          />
          <UpdateFormField
            fieldName={fields.competitors.name}
            inputType="textarea"
            label={fields.competitors.name}
            defaultValue={fields.competitors.value}
          />
          <UpdateFormField
            fieldName={fields.growthOpportunities.name}
            inputType="textarea"
            label={fields.growthOpportunities.name}
            defaultValue={fields.growthOpportunities.value}
          />
          <UpdateFormField
            fieldName={fields.assets.name}
            inputType="textarea"
            label={fields.assets.name}
            defaultValue={fields.assets.value}
          />
          <UpdateFormField
            fieldName={fields.sellingReason.name}
            inputType="textarea"
            label={fields.sellingReason.name}
            defaultValue={fields.sellingReason.value}
          />
          <UpdateFormField
            fieldName={fields.financing.name}
            inputType="textarea"
            label={fields.financing.name}
            defaultValue={fields.financing.value}
          />
          <UpdateFormField
            fieldName={fields.scale.name}
            inputType="textarea"
            label={fields.scale.name}
            defaultValue={fields.scale.value}
          />
          <UpdateFormField
            fieldName={fields.businessModel.name}
            inputType="textarea"
            label={fields.businessModel.name}
            defaultValue={fields.businessModel.value}
          />
          <UpdateFormField
            fieldName={fields.maturity.name}
            inputType="textarea"
            label={fields.maturity.name}
            defaultValue={fields.maturity.value}
          />
          <UpdateFormField
            fieldName={fields.location.name}
            inputType="textarea"
            label={fields.location.name}
            defaultValue={fields.location.value}
          />
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <SubmitButton text="Save" />
      </CardFooter>
    </form>
  );
}
