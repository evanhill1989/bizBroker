import { requireUser } from "@/app/utils/requireUser";
import ListingMetrics from "@/components/dashboard/ListingMetrics";
import ListingPreviewCardCarousel from "@/components/dashboard/ListingPreviewCardCarousel";
import NewListingDialog from "@/components/onboarding/seller/NewListingDialog";
import { prisma } from "@/lib/prisma";

const uniqueViews = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  value: Math.floor(Math.random() * 200),
})).reverse();

const clicks = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  value: Math.floor(Math.random() * 50),
})).reverse();

const totalViews = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  value: Math.floor(Math.random() * 500),
})).reverse();

const metrics = { uniqueViews, clicks, totalViews };

export default async function SellerDashboardPage() {
  const kindeUser = await requireUser();
  const listings = await prisma.listing.findMany({
    where: {
      userId: kindeUser.id,
    },
  });

  return (
    <div className="wrapper">
      {/* New Listing Dialog */}
      <NewListingDialog />
      <div className="px-12 carousel-arrow-hack">
        {/* Above hack is Only simple way to keep carousel pagination from jumping the wrapper */}
        <div className="wrapper">
          <ListingPreviewCardCarousel listings={listings} />
        </div>
        <div className="wrapper">
          <ListingMetrics metrics={metrics} />
        </div>
      </div>
    </div>
  );
}
