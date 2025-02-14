// types.ts or listingTypes.ts
import { ListingType } from "./dbTypes";

export type FilteredCardListingType = Pick<
  ListingType,
  "id" | "name" | "description" | "businessModel" | "trailing12MonthProfit" | "trailing12MonthRevenue" | "price"
>;

export type FilteredListsListingType = Pick<
  ListingType,
  "id" | "name" | "description" | "maturity" | "businessModel" | "trailing12MonthProfit" | "trailing12MonthRevenue" | "price"
>;

export type FormattedFilteredListListingType = {
    id: string;
    name: string;
    description: string;
    maturity: string;
    businessModel: string;
    formattedTrailing12MonthProfit: string;
    formattedTrailing12MonthRevenue: string;
    formattedPrice: string;
}

// Define a formatted version of the type
export type FormattedFilteredCardListingType = {
  id: string;
  name: string;
  description: string;
  businessModel: string;
  formattedTrailing12MonthProfit: string;
  formattedTrailing12MonthRevenue: string;
  formattedPrice: string;
};
