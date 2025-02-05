import { UpdateBuyerScaleStepAction } from "@/app/utils/actions/onboardingActions";
import { BackButton } from "@/components/dashboard/BackButton";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { title } from "process";

export default async function BuyersScalePage() {
  return (
    <>
      <Card className="w-1/2 m-auto">
        <CardHeader>
          <CardTitle>What scale are you looking for?</CardTitle>
          <CardDescription>
            Choose a general size and scope for your search parameters
          </CardDescription>
        </CardHeader>
        <form action={UpdateBuyerScaleStepAction}>
          <CardContent>
            <fieldset className="flex flex-col space-y-2">
              <legend className="text-lg font-medium">
                Select your scale:
              </legend>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="scale" value="small" />
                <span>Small</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="scale" value="medium" />
                <span>Medium</span>
              </label>

              <label className="flex items-center space-x-2">
                <Input type="radio" name="scale" value="large" />
                <span>Large</span>
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
