import { DeleteListing } from "@/app/utils/actions/actions";
import { UploadImageForm } from "@/components/dashboard/forms/UploadImageForm";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function SettingsSiteRoute(props: {
  params: Promise<{ listingId: string }>;
}) {
  const params = await props.params;

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline">
          <Link href={`/dashboard/sites/${params.listingId}`}>
            <ChevronLeft />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>

      <UploadImageForm listingId={params.listingId} />

      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription>
            You are about to delete your listing. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteListing}>
            <input type="hidden" name="listingId" value={params.listingId} />
            <SubmitButton variant="destructive" text="Delete Everything" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
