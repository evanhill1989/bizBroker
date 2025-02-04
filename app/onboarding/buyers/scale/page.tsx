import OnboardingCard from "@/components/onboarding/OnboardingCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <CardContent>
            {/* left off here deciding how to handle form, what to abstract away, and why */}
          </CardContent>
        </CardHeader>

        <CardFooter className="w-full"></CardFooter>
      </Card>
    </>
  );
}
