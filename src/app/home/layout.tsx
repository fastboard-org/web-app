import HomeNavbarLayout from "@/components/layout/HomeNavbarLayout";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import SessionVerifier from "@/components/session/SessionVerifier";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionVerifier>
      <HomeNavbarLayout>
        <div className="flex justify-end p-10 mt-2.5 absolute right-0">
          <ThemeSwitcher size="md" />
        </div>
        <main className="flex h-screen flex-col p-10 w-full gap-4">
          {children}
        </main>
      </HomeNavbarLayout>
    </SessionVerifier>
  );
}
