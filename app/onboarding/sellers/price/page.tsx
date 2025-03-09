import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import PriceForm from "@/components/onboarding/seller/forms/PriceForm";

export default async function PricePage() {
  const user = await requireUser();
  const listing = await prisma.listing.findFirst({
    where: {
      userId: user.id,
      listingOnboardingStep: { not: "completed" },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!listing) return redirect("/");
  if (listing.listingOnboardingStep !== "price") {
    return redirect(`/onboarding/sellers/${listing.listingOnboardingStep}`);
  }

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Describe your business</CardTitle>
          <CardDescription>
            You can provide three different depths of descriptions. It is
            advisable to fill out all three as best you can now, but you will
            always be able to update this later.
          </CardDescription>
        </CardHeader>
        <PriceForm listingId={listing.id} />
      </Card>
    </>
  );
}
