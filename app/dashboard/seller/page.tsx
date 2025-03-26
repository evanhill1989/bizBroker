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
    </div>
  );
}
