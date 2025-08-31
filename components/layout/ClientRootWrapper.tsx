"use client";

import { ThemeClientWrapper } from "../ThemeClientWrapper";
import ClientHeaderWrapper from "./ClientHeaderWrapper";

export function ClientRootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeClientWrapper>
      <ClientHeaderWrapper>{children}</ClientHeaderWrapper>
    </ThemeClientWrapper>
  );
}
