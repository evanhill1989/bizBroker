export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Onboarding</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
