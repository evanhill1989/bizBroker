import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DescriptionsForm from "@/components/onboarding/seller/forms/DescriptionsForm";
import { requireUser } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function DescriptionsPage() {
  // Fetch user and their latest listing
  const user = await requireUser();
  const listing = await prisma.listing.findFirst({
    where: { userId: user.id },
  });

  // Redirect if user doesn't have a listing or is on the wrong step
  if (!listing || user.sellerOnboardingStep !== "descriptions") {
    return redirect(`/onboarding/sellers/${user.sellerOnboardingStep}`);
  }

  return (
    <Card className="m-auto border-none shadow-none lg:px-12 lg:w-2/3">
      <CardHeader>
        <CardTitle>Describe your business</CardTitle>
        <CardDescription>
          You can provide three different depths of descriptions. It is
          advisable to fill out all three as best you can now, but you will
          always be able to update this later.
        </CardDescription>
      </CardHeader>
      <DescriptionsForm listing={listing} />
    </Card>
  );
}
