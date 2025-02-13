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
  const listing = await getListingById(params.listingId);

  return (
    <>
      <section>
        <div>
          <div>
            <Goal />
            <h2>Listing Category</h2>
            <LocationWidget />
          </div>
          <h1>Listing ID: {listing?.name}</h1>
        </div>
        <div className="price">
          <div>
            <h3>Price</h3>
            <p>{listing?.price}</p>
          </div>
          <div>
            <p>
              Price Reasoning will go here! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Mollitia ut consequuntur esse cum,
              iste minus tempora laudantium dignissimos soluta blanditiis.
            </p>
          </div>
        </div>
        <div className="financials">
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
          ].map(({ title, value }) => (
            <div key={title}>
              <h5 className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                {title}
              </h5>
              <div>
                <Goal />
                <p className="text-lg font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="profile">
          <div className="longform-description">
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
          </div>
          <div>
            <h4>Date Founded</h4>
            <p className="underline">#DateFounded</p>
          </div>
        </div>
      </section>
      <section className="metrics"></section>
    </>
  );
}
