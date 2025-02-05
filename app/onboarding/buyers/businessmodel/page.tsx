import { UpdateBuyerBusinessModelStepAction } from "@/app/utils/actions/onboardingActions";
import { BackButton } from "@/components/dashboard/BackButton";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
        <form action={UpdateBuyerBusinessModelStepAction}>
          <CardContent>
            <fieldset className="flex flex-col space-y-2">
              <legend className="text-lg font-medium">
                Select your business:
              </legend>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="business" value="retial" />
                <span>Retail</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="business" value="online" />
                <span>Online</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="business" value="b2b" />
                <span>Business to business</span>
              </label>
            </fieldset>
          </CardContent>

          <CardFooter className="w-full">
            <BackButton>Back </BackButton>
            <SubmitButton text="Next" />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
