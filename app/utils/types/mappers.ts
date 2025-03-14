// utils.ts or mappers.ts
import {
  FilteredListingType,
  FormattedFilteredListingType,
} from "@/app/utils/types/listingTypes";

import { Prisma } from "@prisma/client";

type ListingWithRelations = Prisma.ListingGetPayload<{
  include: { User: true; posts: true; BuyerListingPreference: true };
}>;

export const formatListingDetails = (listing: ListingWithRelations) => {
  return {
    id: listing.id,
    name: listing.businessName,
    price: listing.price ? `$${Math.round(listing.price / 1000)}K` : "#N/A",
    description: listing.description || "No description available",
    shortDescription: listing.shortDescription || "",
    longDescription: listing.longDescription || "",
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
    imageUrl: listing.imageUrl || "/default-image.png",
    location: listing.location,
    businessModel: listing.businessModel ?? "N/A",
    maturity: listing.maturity ?? "N/A",
    scale: listing.scale ?? "N/A",
    foundedDate: listing.foundedDate
      ? listing.foundedDate.toISOString()
      : "Unknown",
    numEmployees: listing.numEmployees ?? "Unknown",

    // Corrected: Keep these as plain strings, not arrays
    competitors: listing.competitors ?? "Not specified",
    growthOpportunities: listing.growthOpportunities ?? "Not specified",
    assets: listing.assets ?? "Not specified",

    sellingReason: listing.sellingReason || "Not specified",
    financing: listing.financing || "Not specified",
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
    seller: listing.User
      ? {
          id: listing.User.id,
          email: listing.User.email,
          name: listing.User.firstName
            ? `${listing.User.firstName} ${listing.User.lastName || ""}`
            : "Unknown Seller",
          profileImage: listing.User.profileImage || "/default-profile.png",
        }
      : null,

    // Uncomment if needed
    // posts: listing.posts.map((post) => ({
    //   id: post.id,
    //   title: post.title,
    //   content: post.content,
    //   createdAt: post.createdAt.toISOString(),
    // })),

    // buyerPreferences: listing.BuyerListingPreference.map((preference) => ({
    //   type: preference.type,
    //   value: preference.value,
    // })),
  };
};

export function mapToFormattedListing(
  listing: FilteredListingType
): FormattedFilteredListingType {
  return {
    id: listing.id,
    businessName: listing.businessName,
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

// export function formatListingDetails(
//   listing: ListingDetailsType
// ): FormattedListingDetailsType {
//   return {
//     id: listing.id,
//     businessName: listing.businessName,
//     description: listing.description,

//     longDescription: listing.longDescription ? listing.longDescription : "#N/A",
//     shortDescription: listing.shortDescription
//       ? listing.shortDescription
//       : "#N/A",
//     businessModel: listing.businessModel,
//     scale: listing.scale ? listing.scale : "#N/A",
//     maturity: listing.maturity,
//     location: listing.location,
//     foundedDate: listing.foundedDate?.toDateString() ?? "",
//     numEmployees: listing.numEmployees
//       ? listing.numEmployees.toString()
//       : "#N/A",
//     competitors: listing.competitors,
//     growthOpportunities: listing.growthOpportunities,
//     assets: listing.assets,
//     sellingReason: listing.sellingReason ? listing.sellingReason : "#N/A",
//     financing: listing.financing ? listing.financing : "#N/A",
//     price: listing.price ? `$${Math.round(listing.price / 1000)}K` : "#N/A",
//     profitMultiple: listing.profitMultiple
//       ? `${Math.round(listing.profitMultiple)}`
//       : "#N/A",
//     revenueMultiple: listing.revenueMultiple
//       ? `${Math.round(listing.revenueMultiple)}`
//       : "#N/A",
//     trailing12MonthProfit: listing.trailing12MonthProfit
//       ? `$${Math.round(listing.trailing12MonthProfit / 1000)}K`
//       : "#N/A",
//     trailing12MonthRevenue: listing.trailing12MonthRevenue
//       ? `$${Math.round(listing.trailing12MonthRevenue / 1000)}K`
//       : "#N/A",
//     lastMonthRevenue: listing.lastMonthRevenue
//       ? `$${Math.round(listing.lastMonthRevenue / 1000)}K`
//       : "#N/A",
//     lastMonthProfit: listing.lastMonthProfit
//       ? `$${Math.round(listing.lastMonthProfit / 1000)}K`
//       : "#N/A",
//   };
// }
