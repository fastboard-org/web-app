// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <NextUIProvider>{children}</NextUIProvider>
    </RecoilRoot>
  );
}
