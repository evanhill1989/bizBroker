import { requireUser } from "@/app/utils/requireUser";
import ListingUpdateForm from "@/components/dashboard/forms/seller/ListingUpdateForm";
import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

import { fieldsConfig } from "@/components/dashboard/forms/seller/listingUpdateFieldsConfig";

export default async function ListingUpdateRoute(props: {
  params: Promise<{ listingId: string }>;
}) {
  const params = await props.params;

  const user = await requireUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await prisma.listing.findUnique({
    where: {
      userId: user.id,
      id: params.listingId,
    },
  });

  console.log(data, "data in [listingId] page inside getData");

  return (
    <>
      <ListingUpdateForm
        fields={fieldsConfig}
        listingId={listingId}
        action={action}
        form={form}
      />
    </>
  );
}
