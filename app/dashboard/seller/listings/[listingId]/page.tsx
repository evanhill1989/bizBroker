import { requireUser } from "@/app/utils/requireUser";
import ListingUpdateForm from "@/components/dashboard/forms/seller/ListingUpdateForm";
import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function ListingUpdatePage(props: {
  params: Promise<{ listingId: string }>;
}) {
  const params = await props.params;

  const user = await requireUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await prisma.listing.findUnique({
    where: {
      id: params.listingId,
    },
  });

  console.log(data, "data in [listingId] page inside getData");
  console.log("listingId", params.listingId);

  return (
    <>
      <ListingUpdateForm listingId={params.listingId} listingData={data} />
    </>
  );
}
