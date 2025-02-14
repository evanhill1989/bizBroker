// types.ts or listingTypes.ts
import { ListingType } from "./dbTypes";



export type FilteredListingType = Pick<
  ListingType,
  "id" | "name" | "description" | "maturity" | "businessModel" | "trailing12MonthProfit" | "trailing12MonthRevenue" | "price"
>;


// Define a formatted version of the type
export type FormattedFilteredListingType = {
  id: string;
  name: string;
  description: string;
  maturity: string;
  businessModel: string;
  formattedTrailing12MonthProfit: string;
  formattedTrailing12MonthRevenue: string;
  formattedPrice: string;
};
