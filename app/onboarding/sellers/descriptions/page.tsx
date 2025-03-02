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
          <CardTitle>Describe your business</CardTitle>
          <CardDescription>
            You can provide three different depths of descriptions. It is
            advisable to fill out all three as best you can now, but you will
            always be able to update this later.
          </CardDescription>
        </CardHeader>
        <DescriptionsForm />
      </Card>
    </>
  );
}
