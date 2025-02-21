// types.ts or listingTypes.ts
import { ListingType } from "./dbTypes";

// for app/listings page.tsx-> (FilteredListings.tsx)
export type FilteredListingType = Pick<
  ListingType,
  | "id"
  | "name"
  | "description"
  | "maturity"
  | "businessModel"
  | "trailing12MonthProfit"
  | "trailing12MonthRevenue"
  | "price"
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

// for app/listings/[listingId]/page.tsx
export type ListingDetailsType = Omit<
  ListingType,
  | "subdirectory"
  | "createdAt"
  | "updatedAt"
  | "imageUrl"
  | "userId"
  | "sellerId"
  | "Seller"
  | "User"
  | "posts"
  | "BuyerListingPreference"
>;

export type FormattedListingDetailsType = {
  id: string;
  name: string;
  description: string;
  shortDescription: string ;
  longDescription: string;
  businessModel: string;
  scale: string;
  maturity: string;
  location: string;
  foundedDate: string;
  numEmployees: string;
  competitors: string[];
  growthOpportunities: string[];
  assets: string[];
  sellingReason: string;
  financing: string;
  price: string;
  profitMultiple: string;
  revenueMultiple: string;
  trailing12MonthProfit: string;
  trailing12MonthRevenue: string;
  lastMonthRevenue: string;
  lastMonthProfit: string;
};
