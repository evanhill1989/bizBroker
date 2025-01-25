import { CompleteOnboardingForm } from "./form";

export default function OnboardingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Onboarding</h1>
      <p className="text-gray-600 mb-8">
        Complete the steps below to get started!
      </p>
      <CompleteOnboardingForm />
    </main>
  );
}
