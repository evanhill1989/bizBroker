import { requireUser } from "@/app/utils/requireUser";
import NewListingUpdateForm from "@/components/dashboard/forms/seller/NewListingUpdateForm";
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
    select: {
      description: true,
      shortDescription: true,
      longDescription: true,
      // id: true,
    },
  });

  return (
    <>
      <NewListingUpdateForm
        data={
          data
            ? data
            : { description: "", shortDescription: "", longDescription: "" }
        }
        listingId={params.listingId}
      />
    </>
  );
}
