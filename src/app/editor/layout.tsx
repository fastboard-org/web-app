import HomeNavbarLayout from "@/components/layout/HomeNavbarLayout";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import SessionVerifier from "@/components/session/SessionVerifier";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionVerifier>
      <main>{children}</main>
    </SessionVerifier>
  );
}
