import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import ProfileForm from "@/components/onboarding/seller/forms/ProfileForm";

export default async function ProfilePage() {
  const user = await requireUser();
  const listing = await prisma.listing.findFirst({
    where: {
      userId: user.id,
      listingOnboardingStep: { not: "completed" },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!listing) return redirect("/");
  if (listing.listingOnboardingStep !== "profile") {
    return redirect(`/onboarding/sellers/${listing.listingOnboardingStep}`);
  }

  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Define your business profile attributes</CardTitle>
          <CardDescription>
            These are short and simple attributes that help a potential buyer
            understand the nature of your business.
          </CardDescription>
        </CardHeader>
        <ProfileForm listingId={listing.id} />
      </Card>
    </>
  );
}
