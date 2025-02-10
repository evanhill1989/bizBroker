import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { Heart, EyeOff, Sunrise } from "lucide-react";
import { getExactMatchListings } from "../utils/actions/actions";
import { requireUser } from "../utils/requireUser";
import { prisma } from "@/lib/prisma";

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

  const matchingListings = await getExactMatchListings(buyer);

  const tempMatchingListings = matchingListings.map((listing) => ({
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
      <div className="grid grid-cols-3 gap-12 p-8">
        {tempMatchingListings
          .filter((listing) => !hiddenListingIds.has(listing.id)) // Exclude hidden listings
          .map((listing) => (
            <Card
              key={listing.id}
              className="flex flex-col justify-between border gap-8 rounded-lg p-8 hover:border-slate-400 hover:shadow-lg  cursor-pointer"
            >
              <CardHeader className="flex flex-row p-0 justify-between">
                <div className="flex gap-2">
                  <Sunrise />
                  <h2 className="text-md font-semibold">{listing.name}</h2>
                  <p>{listing.businessModel}</p>
                </div>
                <div className="like-toggles flex gap-4">
                  <Heart size={20} />
                  <EyeOff size={20} />
                </div>
              </CardHeader>
              <CardDescription className="description text-sm text-primary max-w-[40ch] line-clamp-3">
                <p className="text-pretty">{listing.description}</p>
              </CardDescription>
              <CardFooter className="flex justify-between p-0">
                <div>
                  <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                    TTM Revenue
                  </p>
                  <p className="text-lg font-semibold">
                    ${listing.trailing12MonthRevenue}K
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                    TTM profit
                  </p>
                  <p className="text-lg font-semibold">
                    ${listing.trailing12MonthProfit}K
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                    Asking Price
                  </p>
                  <p className="text-lg font-semibold">${listing.price}K</p>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
}
