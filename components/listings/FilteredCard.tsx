import { EyeOff, Heart, Sunrise } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Toggle } from "../ui/toggle";

import Link from "next/link";
import { FormattedFilteredListingType } from "@/app/utils/types/listingTypes";

export default function FilteredCard({
  listing,
  likedListingIds,
  onFavorite,
  onHide,
}: {
  listing: FormattedFilteredListingType;
  likedListingIds: Set<string>;
  onFavorite: (id: string) => void;
  onHide: (id: string) => void;
}) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="flex flex-col justify-between border gap-8 rounded-lg p-8 hover:border-slate-400 hover:shadow-lg cursor-pointer">
        <CardHeader className="flex flex-row p-0 justify-between">
          <div className="flex gap-2">
            <Sunrise />
            <h2 className="text-md font-semibold">{listing.businessName}</h2>
            <p>{listing.businessModel}</p>
          </div>
          <div className="like-toggles flex gap-4">
            <Toggle
              asChild
              onPressedChange={() => onFavorite(listing.id)}
              defaultPressed={likedListingIds.has(listing.id)}
            >
              <Heart size={20} />
            </Toggle>

            <Toggle asChild onPressedChange={() => onHide(listing.id)}>
              <EyeOff size={20} />
            </Toggle>
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
              {listing.formattedTrailing12MonthRevenue}
            </p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              TTM profit
            </p>
            <p className="text-lg font-semibold">
              {listing.formattedTrailing12MonthProfit}
            </p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Asking Price
            </p>
            <p className="text-lg font-semibold">{listing.formattedPrice}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
