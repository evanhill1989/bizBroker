import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onboardingSteps } from "@/components/onboarding/buyer/forms/constants";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

export default async function BuyersOnboardingPage(props: {
  params: Promise<{ onboardingStep: string }>;
}) {
  const params = await props.params;

  const step = parseInt(params.onboardingStep || "1", 10);

  const currentStep = onboardingSteps.find((s) => s.id === step)!;

  return (
    <>
      <Card className="w-1/2 m-auto">
        <CardHeader>
          <CardTitle>Hi, {currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
          <CardContent>{currentStep.cardContent}</CardContent>
        </CardHeader>

        <CardFooter className="w-full"></CardFooter>
      </Card>
    </>
  );
}
