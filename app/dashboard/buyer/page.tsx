import { getExactMatchListings } from "@/app/utils/actions/actions";
import { requireUser } from "@/app/utils/requireUser";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import {
  BadgeDollarSign,
  CalendarPlus,
  ChartNoAxesCombined,
  EyeOff,
  Heart,
  MapPinHouse,
  Sunrise,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function BuyerDashboardPage() {
  const user = await requireUser();

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  if (buyer?.onboardingStep === "intro")
    return redirect("/onboarding/buyers/intro");

  if (!buyer) {
    return redirect("/onboarding/buyers/intro");
  }

  const matchingListings = await getExactMatchListings(buyer);

  return (
    <div className="grid grid-rows-3 gap-12">
      <div className="grid grid-cols-5 gap-4 w-full items-start row-span-1">
        <button className="flex text-start flex-col gap-6 hover:bg-primary/20 align-start border px-6 py-8 rounded-lg">
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
        <Carousel>
          <CarouselContent>
            {matchingListings.map((listing) => (
              <CarouselItem
                key={listing.id}
                className="md:basis-1/2 lg:basis-1/3 p-4"
              >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );

  // should i just get this with getExactMatchListings? const buyerListingPreferences = await getBuyerListingPreferences(buyer)
}
