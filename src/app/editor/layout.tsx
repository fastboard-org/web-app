import SessionVerifier from "@/components/session/SessionVerifier";
import { Toaster } from "@/components/shared/Toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionVerifier>
      <Toaster position="bottom-right" richColors />
      <main>{children}</main>
    </SessionVerifier>
  );
}
