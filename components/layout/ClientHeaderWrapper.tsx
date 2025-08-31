"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ClientHeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const headerRoutes = ["/", "/auth/login", "/auth/register", "/interview"];
  const showHeader = headerRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
