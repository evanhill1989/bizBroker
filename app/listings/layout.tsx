import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header></header>
      <main className="grid  w-11/12 max-w-9xl mx-auto">{children}</main>
    </div>
  );
}
