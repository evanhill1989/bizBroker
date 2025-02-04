import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost">
      <ArrowLeft className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
