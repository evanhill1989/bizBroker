export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../utils/requireUser";

import FilteredListings from "@/components/listings/FilteredListings";
import { mapToFormattedListing } from "@/app/utils/types/mappers";

export default async function ListingsIndexPage() {
  const user = await requireUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  const listingPreferences = dbUser
    ? await prisma.buyerListingPreference.findMany({
        where: { userId: dbUser.id },
      })
    : [];

  const hiddenListingIds = new Set(
    listingPreferences
      .filter((pref) => pref.status === "HIDDEN")
      .map((pref) => pref.listingId)
  );

  const likedListingIds = new Set(
    listingPreferences
      .filter((pref) => pref.status === "LIKED")
      .map((pref) => pref.listingId)
  );

  const listings = await prisma.listing.findMany();

  const formattedListings = listings.map((listing) =>
    mapToFormattedListing(listing)
  );

  return (
    <>
      <h1 className="text-2xl font-semibold mt-5 mb-10 pb-5 border-b-[1px] border-slate-200">
        Listings
      </h1>

      <FilteredListings
        listings={formattedListings}
        hiddenListingIds={hiddenListingIds}
        dbUserId={dbUser?.id ?? ""}
        likedListingIds={likedListingIds}
      />
    </>
  );
}
