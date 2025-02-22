import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DescriptionsForm from "@/components/onboarding/seller/forms/DescriptionsForm";

export default async function DescriptionsPage() {
  return (
    <>
      <Card className=" m-auto border-none shadow-none  lg:px-12 lg:w-2/3">
        <CardHeader>
          <CardTitle>What is your revenue multiple target range?</CardTitle>
          <CardDescription>
            Choose the range of revenue multiples you are looking for
          </CardDescription>
        </CardHeader>
        <DescriptionsForm />
      </Card>
    </>
  );
}
