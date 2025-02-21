// utils.ts or mappers.ts
import {
  FilteredListingType,
  FormattedFilteredListingType,
  ListingDetailsType,
  FormattedListingDetailsType,
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

export function formatListingDetails(
  listing: ListingDetailsType
): FormattedListingDetailsType {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,

    longDescription: listing.longDescription ? listing.longDescription : "#N/A",
    shortDescription: listing.shortDescription
      ? listing.shortDescription
      : "#N/A",
    businessModel: listing.businessModel,
    scale: listing.scale ? listing.scale : "#N/A",
    maturity: listing.maturity,
    location: listing.location,
    foundedDate: listing.foundedDate?.toDateString() ?? "",
    numEmployees: listing.numEmployees
      ? listing.numEmployees.toString()
      : "#N/A",
    competitors: listing.competitors,
    growthOpportunities: listing.growthOpportunities,
    assets: listing.assets,
    sellingReason: listing.sellingReason ? listing.sellingReason : "#N/A",
    financing: listing.financing ? listing.financing : "#N/A",
    price: listing.price ? `$${Math.round(listing.price / 1000)}K` : "#N/A",
    profitMultiple: listing.profitMultiple
      ? `${Math.round(listing.profitMultiple)}`
      : "#N/A",
    revenueMultiple: listing.revenueMultiple
      ? `${Math.round(listing.revenueMultiple)}`
      : "#N/A",
    trailing12MonthProfit: listing.trailing12MonthProfit
      ? `$${Math.round(listing.trailing12MonthProfit / 1000)}K`
      : "#N/A",
    trailing12MonthRevenue: listing.trailing12MonthRevenue
      ? `$${Math.round(listing.trailing12MonthRevenue / 1000)}K`
      : "#N/A",
    lastMonthRevenue: listing.lastMonthRevenue
      ? `$${Math.round(listing.lastMonthRevenue / 1000)}K`
      : "#N/A",
    lastMonthProfit: listing.lastMonthProfit
      ? `$${Math.round(listing.lastMonthProfit / 1000)}K`
      : "#N/A",
  };
}
