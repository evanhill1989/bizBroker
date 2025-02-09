import { getExactMatchListings } from "@/app/utils/actions/actions";
import { requireUser } from "@/app/utils/requireUser";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";


export default async function BuyerDashboardPage() {

  const user = await requireUser();

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });


  const matchingListings = await getExactMatchListings(buyer);

  const tempMatchingListings = matchingListings.map((listing) => ({
    id: listing.id,
    name: listing.name,
    price: Math.floor(listing.price / 100) * 100,
    businessModel: listing.businessModel,
    scale: listing.scale,
    maturity: listing.maturity,
    trailing12MonthRevenue: Math.floor(listing.trailing12MonthRevenue),
    trailing12MonthProfit: Math.floor(listing.trailing12MonthProfit),
    profitMultiple: Math.floor(listing.profitMultiple),
    revenueMultiple: Math.floor(listing.revenueMultiple),
  }));


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 max-w-full">
      <h1 className="text-3xl font-bold mb-4">Hello Buyer!!!</h1>
      <p className="text-gray-600 mb-8">
        Complete the steps below to get started!
      </p>
      <div className="sm:w-[400px] md:w-[600px] lg:w-[1200px]">
        <div className="listings grid grid-flow-col auto-cols-max  overflow-x-auto whitespace-nowrap border p-2">
        {tempMatchingListings.map((listing, index) => (
          <Card key={listing.id} className="mr-4">
               <div>
                <div>
                  <p>icon</p>
                  <h3>{listing.businessModel}</h3>
                </div>
                <div className="like">hu7  
                  <p>eyeball</p>
                  <p>heart</p>
                </div>
               </div>
            <div className="flex">
              <h2 className="text-lg font-semibold">{index + 1}.{listing.name}</h2>
            </div>
            <p>${listing.price}</p>
          </Card>
    
          
        ))}
      </div>
      </div>
     
    </main>
  );
}
