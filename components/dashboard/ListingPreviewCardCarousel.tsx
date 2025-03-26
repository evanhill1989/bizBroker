import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { EyeOff, Heart, Sunrise } from "lucide-react";

export default function ListingPreviewCardCarousel({
  listings,
}: {
  listings: any;
}) {
  return (
    <Carousel className="">
      <CarouselContent>
        {listings.map((listing, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Link href={`/dashboard/seller/${listing.id}`}>
              <Card className="flex flex-col justify-between border gap-8 rounded-lg p-8 hover:border-slate-400 hover:shadow-lg  cursor-pointer">
                <CardHeader className="flex flex-row p-0 justify-between">
                  <div className="flex gap-2">
                    <Sunrise />
                    <h2 className="text-lg font-semibold">
                      {listing.businessModel}
                    </h2>
                  </div>
                  <div className="like-toggles flex gap-4">
                    <Heart />
                    <EyeOff />
                  </div>
                </CardHeader>
                <CardDescription className="description text-base text-primary max-w-[40ch] line-clamp-3">
                  <p className="text-pretty">{listing.description}</p>
                </CardDescription>
                <CardFooter className="flex justify-between p-0">
                  <div>
                    <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                      TTM Revenue
                    </p>
                    <p className="text-xl font-semibold">
                      ${listing.trailing12MonthRevenue}K
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                      TTM profit
                    </p>
                    <p className="text-xl font-semibold">
                      ${listing.trailing12MonthProfit}K
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                      Asking Price
                    </p>
                    <p className="text-xl font-semibold">${listing.price}K</p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
