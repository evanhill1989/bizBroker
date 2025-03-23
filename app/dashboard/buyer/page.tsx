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
  const newestListings = await prisma.listing.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  console.log(newestListings, "newestListings");
  const listings = [matchingListings, [], [], [], newestListings];
  return (
    <div className="  ">
      <CuratedListings listings={listings} />
    </div>
  );
}
