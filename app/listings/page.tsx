


import { requireUser } from "../utils/requireUser";
import { prisma } from "@/lib/prisma";

import FilteredListings from "@/components/listings/FilteredListings";

export default async function ListingsIndexPage() {
  const user = await requireUser();

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  const listingPreferences = await prisma.buyerListingPreference.findMany({
    where: { buyerId: buyer.id },
  });

  const hiddenListingIds = new Set(
    listingPreferences
      .filter((pref) => pref.status === "HIDDEN")
      .map((pref) => pref.listingId)
  );

  const listings = await prisma.listing.findMany();

  const formattedListings = listings.map((listing) => ({
    id: listing.id,
    name: listing.name,
    description: listing.description,
    subdirectory: listing.subdirectory,
    price: Math.floor(listing.price / 1000),
    businessModel: listing.businessModel,
    scale: listing.scale,
    maturity: listing.maturity,
    trailing12MonthRevenue: Math.floor(listing.trailing12MonthRevenue / 1000),
    trailing12MonthProfit: Math.floor(listing.trailing12MonthProfit / 1000),
    profitMultiple: Math.floor(listing.profitMultiple),
    revenueMultiple: Math.floor(listing.revenueMultiple),
  }));

  return (
    <>
      <h1 className="text-2xl font-semibold mt-5 mb-10 pb-5 border-b-[1px] border-slate-200">Listings</h1>
    
      <FilteredListings listings={formattedListings} hiddenListingIds={hiddenListingIds} />
    </>
  );
}
