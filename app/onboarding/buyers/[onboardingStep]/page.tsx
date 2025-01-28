import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Goal } from "lucide-react";

import { ScaleForm } from "@/components/onboarding/buyer/forms/ScaleForm";
import { MaturityForm } from "@/components/onboarding/buyer/forms/MaturityForm";

export default async function BuyersOnboardingPage(props: {
  params: Promise<{ onboardingStep: string }>;
}) {
  const params = await props.params;

  const step = parseInt(params.onboardingStep || "1", 10);

  const onboardingSteps = [
    {
      id: 1,
      title: "We'll help you build your first search",
      description: "Answer a few straightforward questions to get started",
      cardContent: (
        <>
          <div className="flex gap-4">
            <Goal className="h-12 w-12" />
            <div>
              <h3 className="text-lg font-semibold">Tell us your goals</h3>
              <p>Answer a few straightforward questions to get started</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 2,
      title: "Scale",
      description: "Choose a general level of maturity and size",
      cardContent: <ScaleForm />,
    },
    {
      id: 3,
      title: "Scale",
      description: "Choose a general level of maturity and size",
      cardContent: <MaturityForm />,
    },
  ];

  const currentStep = onboardingSteps.find((s) => s.id === step)!;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Hi, {currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
          <CardContent>{currentStep.cardContent}</CardContent>
        </CardHeader>

        <CardFooter>
          <h3>Umm hello?</h3>
        </CardFooter>
      </Card>
    </>
  );
}
