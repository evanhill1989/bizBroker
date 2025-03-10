import { MaturityForm } from "@/components/onboarding/buyer/forms/MaturityForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BuyersMaturityPage() {
  return (
    <>
      <Card className="m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What Maturity are you looking for?</CardTitle>
          <CardDescription>
            Choose a general size and scope for your search parameters
          </CardDescription>
        </CardHeader>
        <MaturityForm />
      </Card>
    </>
  );
}
