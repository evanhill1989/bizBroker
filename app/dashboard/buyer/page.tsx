import { getExactMatchListings } from "@/app/utils/actions/actions";
import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/lib/prisma";


export default async function BuyerDashboardPage() {

  const user = await requireUser();
  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  const matchingListings = await getExactMatchListings(buyer);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Hello Buyer</h1>
      <p className="text-gray-600 mb-8">
        Complete the steps below to get started!
      </p>
      <div className="listings">
        {matchingListings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <h2>{listing.name}</h2>
            <p>{listing.description}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </main>
  );
}
