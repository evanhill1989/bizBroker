import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import PriceFormRefactor from "@/components/onboarding/seller/forms/PriceFormRefactor";

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
  // if (listing.listingOnboardingStep !== "price") {
  //   return redirect(`/onboarding/sellers/${listing.listingOnboardingStep}`);
  // }

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Update your asking price</CardTitle>
          <CardDescription>
            Please provide the asking price of your business, and other
            financial details below. As always, the more accurate information
            you provide, the better your chance of finding a buying partner that
            is a good fit for your business.
          </CardDescription>
        </CardHeader>
        <PriceFormRefactor listingId={listing.id} />
      </Card>
    </>
  );
}
