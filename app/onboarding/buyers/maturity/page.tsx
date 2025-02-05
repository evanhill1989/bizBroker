import { UpdateBuyerMaturityStepAction } from "@/app/utils/actions/onboardingActions";
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

export default async function BuyerMaturityPage() {
  return (
    <>
      <Card className="w-1/2 m-auto">
        <CardHeader>
          <CardTitle>What maturity are you looking for?</CardTitle>
          <CardDescription>
            Choose a general size and scope for your search parameters
          </CardDescription>
        </CardHeader>
        <form action={UpdateBuyerMaturityStepAction}>
          <CardContent>
            <fieldset className="flex flex-col space-y-2">
              <legend className="text-lg font-medium">
                Select your maturity:
              </legend>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="maturity" value="startup" />
                <span>Startup</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="maturity" value="growing" />
                <span>Growing</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="maturity" value="established" />
                <span>Established</span>
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
