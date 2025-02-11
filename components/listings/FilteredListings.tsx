"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Heart, EyeOff, Sunrise } from "lucide-react";
import FilterBar from "@/components/listings/FilterBar";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { updateListingPreference } from "@/app/utils/actions/actions";

export default function FilteredListings({
  listings,
  hiddenListingIds,
  buyerId,
}) {
  const [filters, setFilters] = useState({
    businessModel: ["online", "b2b", "retail"],
    priceRange: null,
    maturity: [],
  });

  const [localHiddenListingIds, setLocalHiddenListingIds] = useState(
    new Set(hiddenListingIds)
  );

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (localHiddenListingIds.has(listing.id)) return false;
      if (filters.businessModel.length === 0) {
        return false; // No business models selected, show nothing
      }

      if (!filters.businessModel.includes(listing.businessModel)) {
        return false;
      }

      return true;
    });
  }, [listings, filters, localHiddenListingIds]);

  const handleHideListing = async (listingId: string) => {
    // Immediately update local state for instant UI feedback
    setLocalHiddenListingIds((prev) => {
      const updated = new Set(prev);
      updated.add(listingId);
      return updated;
    });

    // Attempt to update server-side in the background
    try {
      await updateListingPreference(buyerId, listingId, "HIDDEN");
    } catch (error) {
      // If server update fails, revert local state
      setLocalHiddenListingIds((prev) => {
        const reverted = new Set(prev);
        reverted.delete(listingId);
        return reverted;
      });
      // Optionally show an error toast
      console.error("Failed to update listing preference");
    }
  };

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} />{" "}
      {/* ✅ Now passing filters */}
      <div className="grid grid-cols-3 gap-12">
        {filteredListings.map((listing) => (
          <Card
            key={listing.id}
            className="flex flex-col justify-between border gap-8 rounded-lg p-8 hover:border-slate-400 hover:shadow-lg cursor-pointer"
          >
            <CardHeader className="flex flex-row p-0 justify-between">
              <div className="flex gap-2">
                <Sunrise />
                <h2 className="text-md font-semibold">{listing.name}</h2>
                <p>{listing.businessModel}</p>
              </div>
              <div className="like-toggles flex gap-4">
                <Toggle
                  asChild
                  onPressedChange={() => {
                    console.log("Heart pressed");
                  }}
                >
                  <Heart size={20} />
                </Toggle>

                <Toggle
                  asChild
                  onPressedChange={() => {
                    handleHideListing(listing.id);
                  }}
                >
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
