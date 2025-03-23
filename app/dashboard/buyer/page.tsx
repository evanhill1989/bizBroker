import { getExactMatchListings } from "@/app/utils/actions/actions";
import { requireUser } from "@/app/utils/requireUser";
import CuratedListings from "@/components/dashboard/CuratedListings";

import ListingPreviewCardCarousel from "@/components/dashboard/ListingPreviewCardCarousel";

import { prisma } from "@/lib/prisma";
import {
  BadgeDollarSign,
  CalendarPlus,
  ChartNoAxesCombined,
  MapPinHouse,
  Sunrise,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function BuyerDashboardPage() {
  const user = await requireUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (dbUser?.buyerOnboardingStep !== "complete")
    return redirect(`/onboarding/buyers/${dbUser?.buyerOnboardingStep}`);

  const matchingListings = await getExactMatchListings(dbUser);

  return (
    <div className="grid grid-rows-3 gap-12">
      <CuratedListings listings={matchingListings} />
      {/* <div className="grid wrapper grid-cols-5 gap-4 w-full items-start row-span-1">
        <button className="flex text-start flex-col gap-6 bg-white hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
          <ChartNoAxesCombined size={40} />
          <h3 className="text-lg font-semibold text-nowrap">
            Popular Listings
          </h3>
        </button>
        <button className="flex text-start flex-col gap-6 hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
          <BadgeDollarSign size={40} />
          <h3 className="text-lg font-semibold text-nowrap">Price Drops</h3>
        </button>
        <button className="flex text-start flex-col gap-6 hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
          <MapPinHouse size={40} />
          <h3 className="text-lg font-semibold text-nowrap">Nearby Retail</h3>
        </button>
        <button className="flex text-start flex-col gap-6 hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
          <Sunrise size={40} />
          <h3 className="text-lg font-semibold text-nowrap">
            Growing Startups
          </h3>
        </button>
        <button className="flex text-start flex-col gap-6 hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
          <CalendarPlus size={40} />
          <h3 className="text-lg font-semibold text-nowrap">New Listings</h3>
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto listings flex flex-col gap-3 row-span-2  ">
        <h4>Listings based on your criteria:</h4>
      </div> */}
    </div>
  );

  // should i just get this with getExactMatchListings? const buyerListingPreferences = await getBuyerListingPreferences(buyer)
}
