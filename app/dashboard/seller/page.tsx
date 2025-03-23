import { requireUser } from "@/app/utils/requireUser";
import ListingPreviewCardCarousel from "@/components/dashboard/ListingPreviewCardCarousel";
import NewListingDialog from "@/components/onboarding/seller/NewListingDialog";
import { prisma } from "@/lib/prisma";

export default async function SellerDashboardPage() {
  const kindeUser = await requireUser();
  const listings = await prisma.listing.findMany({
    where: {
      userId: kindeUser.id,
    },
  });

  return (
    <div className="wrapper">
      <h1>Sellers Dashboard</h1>
      <div>
        <h3>Listing Metrics</h3>
        <p>Views</p>
        <p>Unique Clicks</p>
        <p>Total Clicks</p>
      </div>
      {/* New Listing Dialog */}
      <NewListingDialog />
      <div className="px-12 carousel-arrow-hack">
        {/* Above hack is Only simple way to keep carousel pagination from jumping the wrapper */}
        <div className="wrapper">
          <ListingPreviewCardCarousel listings={listings} />
        </div>
      </div>

      {/* <div>
        <Carousel>
          <CarouselContent>
            {mockMatchingListings.map((listing) => (
              <CarouselItem
                key={listing.id}
                className="md:basis-1/2 lg:basis-1/3 p-4"
              >
                <Link href={`/dashboard/seller/listings/${listing.id}`}>
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
                        <p className="text-xl font-semibold">
                          ${listing.price}K
                        </p>
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
      </div>
      <div>
        <h3>Similar listings to yours</h3>
        <Carousel>
          <CarouselContent>
            {mockMatchingListings.map((listing) => (
              <CarouselItem
                key={listing.id}
                className="md:basis-1/2 lg:basis-1/3 p-4"
              >
                <Link href={`/dashboard/seller/listings/${listing.id}`}>
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
                        <p className="text-xl font-semibold">
                          ${listing.price}K
                        </p>
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
      </div> */}
    </div>
  );
}
