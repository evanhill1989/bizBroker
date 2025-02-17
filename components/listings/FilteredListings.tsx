"use client";

import { useState, useMemo } from "react";

import FilterBar from "@/components/listings/FilterBar";

import {
  updateListingPreference,
  deleteListingPreference,
} from "@/app/utils/actions/actions";
import FilteredCard from "./FilteredCard";

import { FormattedFilteredListingType } from "@/app/utils/types/listingTypes";

interface Filters {
  businessModel: string[];
  priceRange: {
    min: number;
    max: number;
  };
  maturity: string[];
}

export default function FilteredListings({
  listings,
  hiddenListingIds,
  buyerId,
  likedListingIds,
}: {
  listings: FormattedFilteredListingType[];
  hiddenListingIds: Set<string>;
  buyerId: string;
  likedListingIds: Set<string>;
}) {
  const [filters, setFilters] = useState<Filters>({
    businessModel: [],
    priceRange: { min: 0, max: 1000 },
    maturity: [],
  });

  const [localHiddenListingIds, setLocalHiddenListingIds] = useState(
    new Set(hiddenListingIds)
  );

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (localHiddenListingIds.has(listing.id)) return false;
      if (filters.businessModel.length === 0) {
        return false;
      }

      if (!filters.businessModel.includes(listing.businessModel)) {
        return false;
      }

      // Add maturity filter
      if (
        filters.maturity.length > 0 &&
        !filters.maturity.includes(listing.maturity)
      ) {
        return false;
      }

      return true;
    });
  }, [listings, filters, localHiddenListingIds]);

  const handleFavoriteListing = async (listingId: string) => {
    if (likedListingIds.has(listingId)) {
      try {
        await deleteListingPreference(buyerId, listingId);
      } catch (error) {
        console.error("Failed to update listing preference:", error);
      }
      return;
    }
    try {
      await updateListingPreference(buyerId, listingId, "LIKED");
    } catch (error) {
      console.error("Failed to update listing preference:", error);
    }
  };

  const handleHideListing = async (listingId: string) => {
    setLocalHiddenListingIds((prev) => {
      const updated = new Set(prev);
      updated.add(listingId);
      return updated;
    });

    try {
      await updateListingPreference(buyerId, listingId, "HIDDEN");
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Failed to update listing preference:", error);

      // If server update fails, revert local state
      setLocalHiddenListingIds((prev) => {
        const reverted = new Set(prev);
        reverted.delete(listingId);
        return reverted;
      });
    }
  };

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={(updater) => setFilters(updater)}
      />

      <div className="grid grid-cols-3 gap-12">
        {filteredListings.map((listing) => (
          <FilteredCard
            key={listing.id}
            listing={listing}
            likedListingIds={likedListingIds}
            onFavorite={handleFavoriteListing}
            onHide={handleHideListing}
          />
        ))}
      </div>
    </>
  );
}
