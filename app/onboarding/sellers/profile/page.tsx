import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProfileForm from "@/components/onboarding/seller/forms/DescriptionsForm";

export default async function ProfilePage() {
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
        <ProfileForm />
      </Card>
    </>
  );
}
