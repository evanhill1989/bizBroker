"use client";

import { useState, useMemo } from "react";
import { Card, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Heart, EyeOff, Sunrise } from "lucide-react";
import FilterBar from "@/components/listings/FilterBar";

export default function FilteredListings({ listings, hiddenListingIds }) {

  const [filters, setFilters] = useState({
    businessModel: ['online', 'b2b', 'retail'], 
    priceRange: null, 
    maturity: [],
  });

  const filteredListings = useMemo(() => {
    console.log("Current Filters:", filters); // Debugging
    return listings.filter((listing) => {
      if (hiddenListingIds.has(listing.id)) return false;
      if (filters.businessModel.length === 0) {
        return false; // No business models selected, show nothing
    }
    
    if (!filters.businessModel.includes(listing.businessModel)) {
        return false;
    }
    
      return true;
    });
  }, [listings, filters, hiddenListingIds]);

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} /> {/* ✅ Now passing filters */}
      <div className="grid grid-cols-3 gap-12">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="flex flex-col justify-between border gap-8 rounded-lg p-8 hover:border-slate-400 hover:shadow-lg cursor-pointer">
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
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">TTM Revenue</p>
                <p className="text-lg font-semibold">${listing.trailing12MonthRevenue}K</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">TTM profit</p>
                <p className="text-lg font-semibold">${listing.trailing12MonthProfit}K</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">Asking Price</p>
                <p className="text-lg font-semibold">${listing.price}K</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
