"use client";

import { useState } from "react";

import BigDashBtn from "./BigDashBtn";
import ListingPreviewCardCarousel from "./ListingPreviewCardCarousel";
import { BadgeDollarSignIcon, ChartNoAxesCombined } from "lucide-react";

export default function CuratedListings({ listings }: { listings: any[] }) {
  const [currentListings, setCurrentListings] = useState([]);
  console.log(currentListings, "currentListings");
  return (
    <>
      <div className="grid wrapper grid-cols-5 gap-4 w-full items-start row-span-1">
        <BigDashBtn
          onClick={() => {
            setCurrentListings(listings[0]);
            console.log(listings, "matchingListings");
            console.log(currentListings, "currentListings");
          }}
          text="Matching Listings"
          icon={<ChartNoAxesCombined size={40} />}
        ></BigDashBtn>
        <BigDashBtn
          text="Price Drops"
          icon={<BadgeDollarSignIcon size={40} />}
        ></BigDashBtn>
        <BigDashBtn
          onClick={() => {
            setCurrentListings(listings[2]);
            console.log(listings, "matchingListings");
            console.log(currentListings, "currentListings");
          }}
          text="Popular Listings"
          icon={<ChartNoAxesCombined size={40} />}
        ></BigDashBtn>
        <BigDashBtn
          onClick={() => {
            setCurrentListings(listings[3]);
            console.log(listings, "matchingListings");
            console.log(currentListings, "currentListings");
          }}
          text="Fast Growing Startups"
          icon={<ChartNoAxesCombined size={40} />}
        ></BigDashBtn>
        <BigDashBtn
          onClick={() => {
            setCurrentListings(listings[4]);
            console.log(listings, "matchingListings");
            console.log(currentListings, "currentListings");
          }}
          text="New Listings"
          icon={<ChartNoAxesCombined size={40} />}
        ></BigDashBtn>
      </div>
      {currentListings.length > 0 && (
        <div className="wrapper">
          <h3 className="text-lg font-semibold text-nowrap">
            Matching Listings
          </h3>
          <ListingPreviewCardCarousel listings={currentListings} />
        </div>
      )}
    </>
  );
}
