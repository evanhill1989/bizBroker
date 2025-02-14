// utils.ts or mappers.ts
import { FilteredCardListingType, FormattedFilteredListListingType, FilteredListsListingType, FormattedFilteredCardListingType } from "@/app/utils/types/listingTypes";

export function mapToFormattedListing(listing: FilteredCardListingType): FormattedFilteredCardListingType {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    businessModel: listing.businessModel,
    formattedTrailing12MonthProfit: listing.trailing12MonthProfit
      ? `$${Math.round(listing.trailing12MonthProfit / 1000)}K`
      : "N/A",
    formattedTrailing12MonthRevenue: listing.trailing12MonthRevenue
      ? `$${Math.round(listing.trailing12MonthRevenue / 1000)}K`
      : "N/A",
    formattedPrice: listing.price ? `$${Math.round(listing.price / 1000)}K` : "N/A",
  };
}

export function mapListingToFiltered(listing: FilteredListsListingType): FormattedFilteredListListingType {
    return {
      id: listing.id,
      name: listing.name,
      businessModel: listing.businessModel,
      maturity: listing.maturity,
      description: listing.description,
      formattedPrice: listing.price ? `$${Math.round(listing.price / 1000)}K` : undefined,
      trailing12MonthRevenue: listing.trailing12MonthRevenue
        ? `$${Math.round(listing.trailing12MonthRevenue / 1000)}K`
        : undefined,
      trailing12MonthProfit: listing.trailing12MonthProfit
        ? `$${Math.round(listing.trailing12MonthProfit / 1000)}K`
        : undefined,
    };
  }