import { LocationForm } from "@/components/onboarding/buyer/forms/LocationForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BuyerLocationPage() {
  return (
    <>
      <Card className="m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What geographic locations are you looking for?</CardTitle>
          <CardDescription>
            Choose the location that best represents your ideal location.
          </CardDescription>
        </CardHeader>
        <LocationForm />
      </Card>
    </>
  );
}
