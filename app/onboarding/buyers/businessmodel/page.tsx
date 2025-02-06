import { BusinessModelForm } from "@/components/onboarding/buyer/forms/BusinessModelForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BuyerBusinessModelPage() {
  return (
    <>
      <Card className="w-1/2 m-auto">
        <CardHeader>
          <CardTitle>What business model are you looking for?</CardTitle>
          <CardDescription>
            Choose the the type that most accurately represents the majority of
            your revenue streams
          </CardDescription>
        </CardHeader>
        <BusinessModelForm />
      </Card>
    </>
  );
}
