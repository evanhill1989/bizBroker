import { requireUser } from "@/app/utils/requireUser";
import NewListingUpdateForm from "@/components/dashboard/forms/seller/NewListingUpdateForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const listingData = await prisma.listing.findUnique({
    where: {
      id: params.listingId,
    },
  });

  return (
    <>
      <Card className="m-auto border-none shadow-none lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Update your listing</CardTitle>
          <CardDescription>Update your entire listing here.</CardDescription>
        </CardHeader>
        {listingData && (
          <NewListingUpdateForm
            listingData={listingData}
            listingId={params.listingId}
          />
        )}
      </Card>
    </>
  );
}
