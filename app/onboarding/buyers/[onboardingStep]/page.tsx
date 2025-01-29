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

import { LocationForm } from "@/components/onboarding/buyer/forms/LocationForm";
import { RevenueMultipleForm } from "@/components/onboarding/buyer/forms/RevenueMultipleForm";
import { TrailingRevenueForm } from "@/components/onboarding/buyer/forms/TrailingRevenueForm";
import { TrailingProfitForm } from "@/components/onboarding/buyer/forms/TrailingProfitForm";
import { ProfitMultipleForm } from "@/components/onboarding/buyer/forms/ProfitMultipleForm";
import { PriceRangeForm } from "@/components/onboarding/buyer/forms/PriceRangeForm";
import { IndustryModelInfraForm } from "@/components/onboarding/buyer/forms/IndustryModelInfraForm";

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
      description: "Choose a general size",
      cardContent: <ScaleForm />,
    },
    {
      id: 3,
      title: "Maturity",
      description: "Choose a general level of maturity and size",
      cardContent: <MaturityForm />,
    },
    {
      id: 4,
      title: "Price Range",
      description: "Choose a price range",
      cardContent: <PriceRangeForm />,
    },
    {
      id: 5,
      title: "Business Model",
      description: "Choose a business model",
      cardContent: <IndustryModelInfraForm />,
    },
    {
      id: 6,
      title: "Revenue Multiple",
      description: "Choose a revenue multiple range",
      cardContent: <RevenueMultipleForm />,
    },
    {
      id: 7,
      title: "Profite Multiple",
      description: "Choose a profit multiple range",
      cardContent: <ProfitMultipleForm />,
    },
    {
      id: 8,
      title: "Trailing Revenue",
      description: "Choose a 12-month trailing revenue range",
      cardContent: <TrailingRevenueForm />,
    },

    {
      id: 9,
      title: "Trailing Profit",
      description: "Choose a 12-month trailing profit range",
      cardContent: <TrailingProfitForm />,
    },

    {
      id: 10,
      title: "Location",
      description: "Choose a location",
      cardContent: <LocationForm />,
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
