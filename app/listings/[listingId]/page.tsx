import { prisma } from "@/lib/prisma";
import { Goal, MapPin } from "lucide-react";
import { formatListingDetails } from "@/app/utils/types/mappers";

export default async function ListingIdRoute(props: {
  params: Promise<{ listingId: string }>;
}) {
  const params = await props.params;

  const listing = await prisma.listing.findUnique({
    where: { id: params.listingId },
  });

  const formattedListing = listing ? formatListingDetails(listing) : null;

  return (
    <div className="max-w-7xl mx-auto ">
      <section className="my-10 bg-white p-16 rounded-sm border border-slate-300">
        <div className="profile-basics grid grid-rows-2 justify-between py-6 gap-4">
          <div className="flex items-center gap-4">
            <Goal size={32} />
            <h2 className="text-xl font-bold">
              {formattedListing?.businessModel}
            </h2>

            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin size={16} />
              <p className="underline">{formattedListing?.location}</p>
            </div>
          </div>
          <h4 className="text-lg font-semibold text-slate-900">
            {formattedListing?.shortDescription}
          </h4>
        </div>
        <div className="divider my-14 h-[1px] w-full bg-slate-300"></div>
        <div className="price">
          <div className="flex gap-4">
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                Price
              </h5>
              <p className="text-3xl text-muted-foreground font-semibold">
                {formattedListing?.price}
              </p>
            </div>
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                Multiples
              </h5>
              <div className="flex gap-4">
                <p className="text-3xl text-muted-foreground font-semibold">
                  {formattedListing?.revenueMultiple}X Revenue
                </p>
                <p className="text-3xl text-muted-foreground font-semibold">
                  {formattedListing?.profitMultiple}X Profit
                </p>
              </div>
            </div>
          </div>

          <div>
            <p>
              Price Reasoning will go here! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Mollitia ut consequuntur esse cum,
              iste minus tempora laudantium dignissimos soluta blanditiis.
            </p>
          </div>
        </div>
        <div className="divider my-14 h-[1px] w-full bg-slate-300"></div>
        <div className="financials grid grid-cols-4 justify-between py-6 gap-4">
          {[
            {
              title: "TTM Revenue",
              value: formattedListing?.trailing12MonthRevenue,
            },
            {
              title: "TTM Profit",
              value: formattedListing?.trailing12MonthProfit,
            },
            {
              title: "Last Month Revenue",
              value: formattedListing?.lastMonthRevenue,
            },
            {
              title: "Last Month Profit",
              value: formattedListing?.lastMonthProfit,
            },
          ].map(({ title, value }) => (
            <div key={title}>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                {title}
              </h5>
              <div className="flex gap-2 mt-2">
                <Goal />
                <p className="text-lg font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="divider my-14 h-[1px] w-full bg-slate-300"></div>
        <div className="profile-indepth">
          <article className="longform-description prose">
            <h2 className="text-xl font-bold">Company Profile</h2>
            <p className="underline text-lg font-semibold">
              {formattedListing?.longDescription}
            </p>
          </article>
          <div className="flex gap-8 my-10">
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                Date Founded
              </h5>
              <p className=" mt-2 text-lg">{formattedListing?.foundedDate}</p>
            </div>
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                # Employees
              </h5>
              <p className=" mt-2 text-lg">{formattedListing?.numEmployees}</p>
            </div>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Business Model
            </h5>
            <p className=" mt-2 text-lg">{formattedListing?.businessModel}</p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Competitors
            </h5>
            <p className=" mt-2 text-lg">{formattedListing?.competitors}</p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Growth Opportunities
            </h5>
            <p className=" mt-2 text-lg">
              {formattedListing?.growthOpportunities}
            </p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Assets
            </h5>
            <p className=" mt-2 text-lg">{formattedListing?.assets}</p>
          </div>
        </div>
        <div className="divider my-14 h-[1px] w-full bg-slate-300"></div>
        <div className="acquisition-details">
          <h2 className="text-xl font-bold">Acquisition Details</h2>
          <div>
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Reason for selling
            </h5>
            <p>{formattedListing?.sellingReason}</p>
          </div>
          <div>
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Financing
            </h5>
            <p>{formattedListing?.financing}</p>
          </div>
        </div>
      </section>
      <section className="metrics"></section>
    </div>
  );
}
