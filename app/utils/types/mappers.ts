// utils.ts or mappers.ts
import {
  FilteredListingType,
  FormattedFilteredListingType,
} from "@/app/utils/types/listingTypes";

export function mapToFormattedListing(
  listing: FilteredListingType
): FormattedFilteredListingType {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    maturity: listing.maturity,
    businessModel: listing.businessModel,
    formattedTrailing12MonthProfit: listing.trailing12MonthProfit
      ? `$${Math.round(listing.trailing12MonthProfit / 1000)}K`
      : "N/A",
    formattedTrailing12MonthRevenue: listing.trailing12MonthRevenue
      ? `$${Math.round(listing.trailing12MonthRevenue / 1000)}K`
      : "N/A",
    formattedPrice: listing.price
      ? `$${Math.round(listing.price / 1000)}K`
      : "N/A",
  };
}
