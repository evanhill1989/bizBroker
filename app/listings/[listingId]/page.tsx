import LocationWidget from "@/components/listings/LocationWidget";
import { prisma } from "@/lib/prisma";
import { Goal } from "lucide-react";

async function getListingById(listingId: string) {
  return prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
}

export default async function ListingIdRoute({
  params,
}: {
  params: { listingId: string };
}) {
  // I think there's a pattern for awaiting params that i've used elsewhere. I should look into it
  const { listingId } = await params;
  const listing = await getListingById(listingId);

  return (
    <div className="max-w-7xl mx-auto ">
      <section className="my-10 bg-white p-16 rounded-sm border border-slate-300">
        <div className="profile-basics grid grid-rows-2 justify-between py-6 gap-4">
          <div className="flex items-center gap-4">
            <Goal size={32} />
            <h2 className="text-xl font-bold">#LISTINGCATEGORY</h2>
            <LocationWidget />
          </div>
          <h4 className="text-lg font-semibold text-slate-900">
            This is a super short description communicating 2 ideas
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
                {listing?.price}
              </p>
            </div>
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                Multiples
              </h5>
              <div className="flex gap-4">
                <p className="text-3xl text-muted-foreground font-semibold">
                  {listing?.revenueMultiple}X Revenue
                </p>
                <p className="text-3xl text-muted-foreground font-semibold">
                  {listing?.profitMultiple}X Profit
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
              value: listing?.trailing12MonthRevenue,
            },
            {
              title: "TTM Profit",
              value: listing?.trailing12MonthProfit,
            },
            {
              title: "Last Month Revenue",
              value: "#LASTMONTHSREV",
            },
            {
              title: "Last Month Profit",
              value: "#LASTMONTHSPROFIT",
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
            <p className="underline text-lg font-semibold">#LONGDESCRIPTION</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio,
              in? Unde iure nulla magni id voluptatem ducimus corrupti. Dolorem,
              incidunt ut? Expedita reiciendis, est fugiat illum ad corporis
              provident enim rerum ut eius? Reiciendis, exercitationem dolorum
              iure, amet non consequatur autem molestias mollitia nesciunt nobis
              vel vitae ipsum quibusdam enim consequuntur corporis molestiae
              beatae? Fugit, ullam exercitationem. Aliquid pariatur provident
              recusandae consequuntur, iure similique autem qui corporis sed
              vitae maiores unde molestias delectus quidem magni nostrum odit
              quas ad excepturi aut eveniet. Ad, neque nam! Voluptate aliquid
              nemo totam maiores doloremque exercitationem dignissimos nulla
              impedit iusto aut aperiam eveniet, id repudiandae autem. Dolore
              voluptatibus dolorum blanditiis id ipsam at, illo ab facere,
              deleniti porro molestias aperiam cum explicabo ratione. Doloremque
              eveniet animi, repellendus aliquam quisquam eos nisi voluptates
              adipisci quo consequuntur vitae accusamus laboriosam natus beatae
              exercitationem repudiandae culpa ab aliquid neque cumque qui
              optio! Cumque quaerat perferendis corrupti maiores quis cum,
              facilis expedita. Deleniti doloribus inventore consequatur
              excepturi. Odio porro suscipit pariatur ex qui atque adipisci
              eligendi officiis velit dolorem ullam perferendis quas illum
              nulla, voluptas, quaerat deserunt laborum! Quos sunt dolores,
              optio minima velit perspiciatis labore quaerat commodi tempore
              laborum, unde reprehenderit accusamus saepe voluptates ea.
              Doloribus, consequatur!
            </p>
          </article>
          <div className="flex gap-8 my-10">
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                Date Founded
              </h5>
              <p className="underline mt-2 text-lg">#DateFounded</p>
            </div>
            <div>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                # Employees
              </h5>
              <p className="underline mt-2 text-lg">#EMPLOYEES</p>
            </div>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Business Model
            </h5>
            <p className="underline mt-2 text-lg">#BUSINESSMODEL</p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Competitors
            </h5>
            <p className="underline mt-2 text-lg">#COMPETITORS</p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Growth Opportunities
            </h5>
            <p className="underline mt-2 text-lg">#GROWTHOPPORTUNITIES</p>
          </div>
          <div className="my-10">
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Assets
            </h5>
            <p className="underline mt-2 text-lg">#ASSETS</p>
          </div>
        </div>
        <div className="divider my-14 h-[1px] w-full bg-slate-300"></div>
        <div className="acquisition-details">
          <h2 className="text-xl font-bold">Acquisition Details</h2>
          <div>
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Reason for selling
            </h5>
            <p>
              <span className="underline bold">#SELLINGREASON</span>Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Quasi est
              reprehenderit dicta provident corporis optio sit, porro aut quis
              dolor sunt voluptates consequuntur, pariatur inventore unde vitae
              sapiente possimus facilis.
            </p>
          </div>
          <div>
            <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
              Financing
            </h5>
            <p>
              <span className="underline bold">#FINANCING</span>Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Quasi est
              reprehenderit dicta provident corporis optio sit, porro aut quis
              dolor sunt voluptates consequuntur, pariatur inventore unde vitae
              sapiente possimus facilis.
            </p>
          </div>
        </div>
      </section>
      <section className="metrics"></section>
    </div>
  );
}
